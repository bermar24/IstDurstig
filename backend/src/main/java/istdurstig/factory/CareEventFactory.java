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
    
    public CareEvent createCareEvent(CareEventType type, String notes, String userId, Object... params) {
        switch (type) {
            case WATERING:
                double amount = params.length > 0 ? (Double) params[0] : 0.0;
                return new WateringEvent(notes, userId, amount);
            
            case FERTILIZING:
                String fertilizerType = params.length > 0 ? (String) params[0] : "";
                return new FertilizingEvent(notes, userId, fertilizerType);
            
            case TRANSPLANTING:
                String potSize = params.length > 0 ? (String) params[0] : "";
                String soilType = params.length > 1 ? (String) params[1] : "";
                return new TransplantEvent(notes, userId, potSize, soilType);
            
            default:
                throw new IllegalArgumentException("Unknown care event type: " + type);
        }
    }
}