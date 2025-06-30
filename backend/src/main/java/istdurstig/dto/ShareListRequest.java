package istdurstig.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class ShareListRequest {
    @NotBlank
    @Email
    private String email;
}