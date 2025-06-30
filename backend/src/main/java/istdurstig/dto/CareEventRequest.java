package istdurstig.dto;

import istdurstig.model.enums.CareEventType;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

@Data
public class CareEventRequest {
    @NotNull
    private CareEventType type;
    
    private String notes;
    private Map<String, Object> additionalData;
}