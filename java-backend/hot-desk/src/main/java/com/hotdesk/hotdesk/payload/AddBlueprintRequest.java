package com.hotdesk.hotdesk.payload;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class AddBlueprintRequest {
    private Integer office;
    private Integer floor;
    private Integer width;
    private Integer height;
}
