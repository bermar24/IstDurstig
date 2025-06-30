package istdurstig.service;

import istdurstig.dto.PlantListRequest;
import istdurstig.model.PlantList;
import istdurstig.repository.PlantListRepository;
import istdurstig.repository.PlantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantListService {

    @Autowired
    private PlantListRepository plantListRepository;

    @Autowired
    private PlantRepository plantRepository;

    @Autowired
    private UserService userService;

    public List<PlantList> getAllPlantListsForUser(String userId) {
        return plantListRepository.findByOwnerIdOrCollaboratorIdsContaining(userId);
    }

    public PlantList getPlantListById(String listId, String userId) {
        PlantList plantList = plantListRepository.findById(listId)
                .orElseThrow(() -> new RuntimeException("Plant list not found"));

        if (!plantList.isUserAllowed(userId)) {
            throw new RuntimeException("Access denied");
        }

        return plantList;
    }

    public PlantList createPlantList(PlantListRequest plantListRequest, String userId) {
        PlantList plantList = new PlantList(plantListRequest.getName(),
                plantListRequest.getDescription(), userId);
        return plantListRepository.save(plantList);
    }

    public PlantList updatePlantList(String listId, PlantListRequest plantListRequest, String userId) {
        PlantList plantList = getPlantListById(listId, userId);

        // Both owner and collaborators can update list details
        if (!plantList.isUserAllowed(userId)) {
            throw new RuntimeException("Access denied");
        }

        plantList.setName(plantListRequest.getName());
        plantList.setDescription(plantListRequest.getDescription());

        return plantListRepository.save(plantList);
    }

    public void deletePlantList(String listId, String userId) {
        PlantList plantList = getPlantListById(listId, userId);

        // Only owner can delete list
        if (!plantList.getOwnerId().equals(userId)) {
            throw new RuntimeException("Only owner can delete list");
        }

        plantListRepository.delete(plantList);
    }

    public PlantList addPlantToList(String listId, String plantId, String userId) {
        PlantList plantList = getPlantListById(listId, userId);

        // Verify plant exists
        if (!plantRepository.existsById(plantId)) {
            throw new RuntimeException("Plant not found");
        }

        plantList.addPlant(plantId);
        return plantListRepository.save(plantList);
    }

    public PlantList removePlantFromList(String listId, String plantId, String userId) {
        PlantList plantList = getPlantListById(listId, userId);

        plantList.removePlant(plantId);
        return plantListRepository.save(plantList);
    }

    public PlantList addCollaboratorByEmail(String listId, String email, String requesterId) {
        PlantList plantList = getPlantListById(listId, requesterId);

        // Only owner can add collaborators
        if (!plantList.getOwnerId().equals(requesterId)) {
            throw new RuntimeException("Only owner can add collaborators");
        }

        // Find user by email
        try {
            var user = userService.getUserByEmail(email);

            // Don't add owner as collaborator
            if (user.getId().equals(plantList.getOwnerId())) {
                throw new RuntimeException("Cannot add owner as collaborator");
            }

            // Check if already a collaborator
            if (plantList.getCollaboratorIds().contains(user.getId())) {
                throw new RuntimeException("User is already a collaborator");
            }

            plantList.addCollaborator(user.getId());
            return plantListRepository.save(plantList);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("User not found")) {
                throw new RuntimeException("No user found with email: " + email);
            }
            throw e;
        }
    }

    public PlantList removeCollaborator(String listId, String userId, String requesterId) {
        PlantList plantList = getPlantListById(listId, requesterId);

        // Only owner can remove collaborators
        if (!plantList.getOwnerId().equals(requesterId)) {
            throw new RuntimeException("Only owner can remove collaborators");
        }

        plantList.removeCollaborator(userId);
        return plantListRepository.save(plantList);
    }
}