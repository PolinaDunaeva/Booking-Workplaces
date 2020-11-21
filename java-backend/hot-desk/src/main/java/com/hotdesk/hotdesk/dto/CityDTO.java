package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.City;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CityDTO {
    private final String name;
    private final String country;

    public CityDTO(City city) {
        this.name = city.getName();
        this.country = city.getCountry().getName();
    }
}
