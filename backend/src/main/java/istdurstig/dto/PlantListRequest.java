package istdurstig.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class PlantListRequest {
    @NotBlank
    private String name;
    
    private String description;
}