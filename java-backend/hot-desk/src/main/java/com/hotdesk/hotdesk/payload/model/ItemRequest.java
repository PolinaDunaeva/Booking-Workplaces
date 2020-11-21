package com.hotdesk.hotdesk.payload.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ItemRequest implements Serializable {
    private Integer x;
    private Integer y;
    private String type;
}
