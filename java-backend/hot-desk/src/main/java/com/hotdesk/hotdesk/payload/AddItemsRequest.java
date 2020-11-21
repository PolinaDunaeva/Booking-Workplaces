package com.hotdesk.hotdesk.payload;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.payload.model.ItemRequest;
import lombok.Data;

import java.util.List;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class AddItemsRequest {

    private Integer office;
    private Integer floor;
    private List<ItemRequest> items;

}
