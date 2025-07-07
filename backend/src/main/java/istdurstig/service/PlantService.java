package istdurstig.service;

import istdurstig.dto.PlantRequest;
import istdurstig.dto.CareEventRequest;
import istdurstig.factory.CareEventFactory;
import istdurstig.model.Plant;
import istdurstig.model.Schedule;
import istdurstig.model.CareEvent;
import istdurstig.model.PlantList;
import istdurstig.repository.PlantRepository;
import istdurstig.repository.PlantListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlantService {
    
    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private PlantListRepository plantListRepository;

    @Autowired
    private CareEventFactory careEventFactory;

    public List<Plant> getAllPlantsForUser(String userId) {
        List<PlantList> userLists = plantListRepository.findByOwnerIdOrCollaboratorIdsContaining(userId);
        List<String> plantIds = userLists.stream()
                .flatMap(list -> list.getPlantIds().stream())
                .distinct()
                .collect(Collectors.toList());
        
        return plantRepository.findByIdIn(plantIds);
    }

    public Plant getPlantById(String plantId, String userId) {
        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new RuntimeException("Plant not found"));
        
        if (!hasAccessToPlant(plantId, userId)) {
            throw new RuntimeException("Access denied");
        }
        
        return plant;
    }

    public Plant createPlant(PlantRequest plantRequest, String userId) {
        Schedule schedule = new Schedule(plantRequest.getFrequency(), null);
        Plant plant = new Plant(plantRequest.getName(), plantRequest.getType(), 
                              plantRequest.getTags(), plantRequest.getNotes(), schedule);
        plant.setPhotoUrl(plantRequest.getPhotoUrl());
        
        return plantRepository.save(plant);
    }

    public Plant updatePlant(String plantId, PlantRequest plantRequest, String userId) {
        Plant plant = getPlantById(plantId, userId);
        
        plant.setName(plantRequest.getName());
        plant.setType(plantRequest.getType());
        plant.setTags(plantRequest.getTags());
        plant.setNotes(plantRequest.getNotes());
        plant.setPhotoUrl(plantRequest.getPhotoUrl());
        
        if (plant.getSchedule() != null) {
            plant.getSchedule().setFrequency(plantRequest.getFrequency());
        } else {
            plant.setSchedule(new Schedule(plantRequest.getFrequency(), null));
        }
        
        return plantRepository.save(plant);
    }

    public void deletePlant(String plantId, String userId) {
        Plant plant = getPlantById(plantId, userId);
        
        // Remove plant from all lists
        List<PlantList> listsContainingPlant = plantListRepository.findByOwnerIdOrCollaboratorIdsContaining(userId)
                .stream()
                .filter(list -> list.getPlantIds().contains(plantId))
                .collect(Collectors.toList());
        
        for (PlantList list : listsContainingPlant) {
            list.removePlant(plantId);
            plantListRepository.save(list);
        }
        
        plantRepository.delete(plant);
    }

    public Plant addCareEvent(String plantId, CareEventRequest careEventRequest, String userId) {
        Plant plant = getPlantById(plantId, userId);
        CareEvent careEvent;
        switch (careEventRequest.getType()) {
            case WATERING:
                Double amount = (Double) careEventRequest.getAdditionalData().get("amount");
                careEvent = careEventFactory.createCareEvent(
                    careEventRequest.getNotes(), userId, amount != null ? amount : 0.0
                );
                break;
            case FERTILIZING:
                String fertilizerType = (String) careEventRequest.getAdditionalData().get("fertilizerType");
                careEvent = careEventFactory.createCareEvent(
                    careEventRequest.getNotes(), userId, fertilizerType != null ? fertilizerType : ""
                );
                break;
            case TRANSPLANTING:
                String potSize = (String) careEventRequest.getAdditionalData().get("potSize");
                String soilType = (String) careEventRequest.getAdditionalData().get("soilType");
                careEvent = careEventFactory.createCareEvent(
                    careEventRequest.getNotes(), userId,
                    potSize != null ? potSize : "", soilType != null ? soilType : ""
                );
                break;
            default:
                throw new IllegalArgumentException("Unknown care event type: " + careEventRequest.getType());
        }

        plant.addCareEvent(careEvent);
        return plantRepository.save(plant);
    }

    public List<Plant> getPlantsDueToday(String userId) {
        List<Plant> userPlants = getAllPlantsForUser(userId);
        return userPlants.stream()
                .filter(Plant::needsWatering)
                .collect(Collectors.toList());
    }

    private boolean hasAccessToPlant(String plantId, String userId) {
        List<PlantList> userLists = plantListRepository.findByOwnerIdOrCollaboratorIdsContaining(userId);
        return userLists.stream()
                .anyMatch(list -> list.getPlantIds().contains(plantId));
    }
}