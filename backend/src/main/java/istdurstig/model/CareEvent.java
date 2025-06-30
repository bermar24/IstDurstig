package istdurstig.model;

import istdurstig.model.enums.CareEventType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class CareEvent {
    @Id
    private String id;
    private CareEventType type;
    private LocalDateTime timestamp;
    private String notes;
    private String userId;

    public CareEvent(CareEventType type, String notes, String userId) {
        this.type = type;
        this.timestamp = LocalDateTime.now();
        this.notes = notes;
        this.userId = userId;
    }
}