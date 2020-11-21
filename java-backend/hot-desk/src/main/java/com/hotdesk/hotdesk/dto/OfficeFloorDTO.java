package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Blueprint;
import com.hotdesk.hotdesk.model.Office;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class OfficeFloorDTO {
    private final String country;
    private final String city;
    private final String name;
    private final Integer floor;
    private final Integer width;
    private final Integer height;
    private final List<Integer> floors;
    private final MapDTO map;

    public OfficeFloorDTO(Office office, Blueprint blueprint) {
        this.country = office.getCity().getCountry().getName();
        this.city = office.getCity().getName();
        this.name = office.getName();
        this.floor = blueprint.getFloor();
        this.width = blueprint.getWidth();
        this.height = blueprint.getHeight();
        this.floors = getFloors(office);
        this.map = new MapDTO(blueprint);
    }

    private List<Integer> getFloors(Office office) {
        return office.getBlueprints().stream()
                .map(Blueprint::getFloor)
                .collect(Collectors.toList());
    }
}
