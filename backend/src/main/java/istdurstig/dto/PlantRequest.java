package istdurstig.dto;

import istdurstig.model.enums.Frequency;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

@Data
public class PlantRequest {
    @NotBlank
    private String name;
    
    private String type;
    private Set<String> tags;
    private String notes;
    private String photoUrl;
    
    @NotNull
    private Frequency frequency;
}