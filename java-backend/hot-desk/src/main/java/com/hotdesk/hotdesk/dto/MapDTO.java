package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Blueprint;

import java.util.List;
import java.util.stream.Collectors;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class MapDTO {
    private final List<DeskDTO> desks;
    private final List<ItemDTO> items;

    public MapDTO(Blueprint blueprint) {
        this.desks = blueprint.getDesks().stream()
                .map(DeskDTO::new)
                .collect(Collectors.toList());

        this.items = blueprint.getItems().stream()
                .map(ItemDTO::new)
                .collect(Collectors.toList());
    }
}
