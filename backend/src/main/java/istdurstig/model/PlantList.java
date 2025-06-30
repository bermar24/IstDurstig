package istdurstig.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "plant_lists")
public class PlantList {
    @Id
    private String id;
    private String name;
    private String description;
    private String ownerId;
    private Set<String> collaboratorIds;
    private List<String> plantIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PlantList(String name, String description, String ownerId) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
        this.collaboratorIds = new HashSet<>();
        this.plantIds = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isUserAllowed(String userId) {
        return ownerId.equals(userId) || collaboratorIds.contains(userId);
    }

    public void addCollaborator(String userId) {
        collaboratorIds.add(userId);
        this.updatedAt = LocalDateTime.now();
    }

    public void removeCollaborator(String userId) {
        collaboratorIds.remove(userId);
        this.updatedAt = LocalDateTime.now();
    }

    public void addPlant(String plantId) {
        if (plantIds == null) {
            plantIds = new ArrayList<>();
        }
        plantIds.add(plantId);
        this.updatedAt = LocalDateTime.now();
    }

    public void removePlant(String plantId) {
        if (plantIds != null) {
            plantIds.remove(plantId);
            this.updatedAt = LocalDateTime.now();
        }
    }
}