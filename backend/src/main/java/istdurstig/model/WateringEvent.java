package istdurstig.model;

import istdurstig.model.enums.CareEventType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class WateringEvent extends CareEvent {
    private double amountLiters;

    public WateringEvent(String notes, String userId, double amountLiters) {
        super(CareEventType.WATERING, notes, userId);
        this.amountLiters = amountLiters;
    }
}