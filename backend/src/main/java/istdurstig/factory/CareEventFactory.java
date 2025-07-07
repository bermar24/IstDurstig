package istdurstig.factory;

import istdurstig.model.*;
import istdurstig.model.CareEvent;
import istdurstig.model.FertilizingEvent;
import istdurstig.model.TransplantEvent;
import istdurstig.model.WateringEvent;
import istdurstig.model.enums.CareEventType;
import org.springframework.stereotype.Component;

@Component
public class CareEventFactory {
    // Overloaded factory methods for compile-time polymorphism
    public WateringEvent createCareEvent(String notes, String userId, double amount) {
        return new WateringEvent(notes, userId, amount);
    }

    public FertilizingEvent createCareEvent(String notes, String userId, String fertilizerType) {
        return new FertilizingEvent(notes, userId, fertilizerType);
    }

    public TransplantEvent createCareEvent(String notes, String userId, String potSize, String soilType) {
        return new TransplantEvent(notes, userId, potSize, soilType);
    }
}