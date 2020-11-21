package com.hotdesk.hotdesk.payload;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;

import java.util.List;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class RemoveItemsRequest {

    private List<Integer> ids;

}
