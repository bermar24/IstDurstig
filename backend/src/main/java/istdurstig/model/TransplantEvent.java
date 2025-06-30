package istdurstig.model;

import istdurstig.model.enums.CareEventType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class TransplantEvent extends CareEvent {
    private String newPotSize;
    private String soilType;

    public TransplantEvent(String notes, String userId, String newPotSize, String soilType) {
        super(CareEventType.TRANSPLANTING, notes, userId);
        this.newPotSize = newPotSize;
        this.soilType = soilType;
    }
}