package istdurstig.model;

import istdurstig.model.enums.CareEventType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class FertilizingEvent extends CareEvent {
    private String fertilizerType;

    public FertilizingEvent(String notes, String userId, String fertilizerType) {
        super(CareEventType.FERTILIZING, notes, userId);
        this.fertilizerType = fertilizerType;
    }
}