package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Desk;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class DeskDTO {
    private final Integer id;
    private final Integer dir;
    private final Integer x;
    private final Integer y;

    public DeskDTO(Desk desk) {
        this.id = desk.getId();
        this.dir = desk.getDir();
        this.x = desk.getX();
        this.y = desk.getY();
    }
}
