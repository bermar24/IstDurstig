package istdurstig.factory;

import istdurstig.model.Plant;
import istdurstig.model.Schedule;
import istdurstig.dto.PlantRequest;
import org.springframework.stereotype.Component;

@Component
public class PlantFactory {
    public Plant createPlant(PlantRequest request) {
        Schedule schedule = new Schedule(request.getFrequency(), null);
        Plant plant = new Plant(
            request.getName(),
            request.getType(),
            request.getTags(),
            request.getNotes(),
            schedule
        );
        plant.setPhotoUrl(request.getPhotoUrl());
        return plant;
    }

    public Plant updatePlant(Plant existing, PlantRequest request) {
        existing.setName(request.getName());
        existing.setType(request.getType());
        existing.setTags(request.getTags());
        existing.setNotes(request.getNotes());
        existing.setPhotoUrl(request.getPhotoUrl());
        if (existing.getSchedule() != null) {
            existing.getSchedule().setFrequency(request.getFrequency());
        } else {
            existing.setSchedule(new Schedule(request.getFrequency(), null));
        }
        return existing;
    }
}
