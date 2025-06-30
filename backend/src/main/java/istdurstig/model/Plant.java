package istdurstig.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "plants")
public class Plant {
    @Id
    private String id;
    private String name;
    private String type;
    private Set<String> tags;
    private String notes;
    private String photoUrl;
    private Schedule schedule;
    private List<CareEvent> careHistory;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Plant(String name, String type, Set<String> tags, String notes, Schedule schedule) {
        this.name = name;
        this.type = type;
        this.tags = tags;
        this.notes = notes;
        this.schedule = schedule;
        this.careHistory = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public boolean needsWatering() {
        return schedule != null && schedule.needsWatering();
    }

    public void addCareEvent(CareEvent event) {
        if (careHistory == null) {
            careHistory = new ArrayList<>();
        }
        careHistory.add(event);
        
        // Update last watered date if it's a watering event
        if (event instanceof WateringEvent && schedule != null) {
            schedule.setLastWatered(event.getTimestamp().toLocalDate());
        }
        
        this.updatedAt = LocalDateTime.now();
    }
}