package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Item;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)

public class ItemDTO {
    private final Integer id;
    private final Integer x;
    private final Integer y;
    private final String type;

    public ItemDTO(Item item) {
        this.id = item.getId();
        this.x = item.getX();
        this.y = item.getY();
        this.type = item.getType();
    }
}
