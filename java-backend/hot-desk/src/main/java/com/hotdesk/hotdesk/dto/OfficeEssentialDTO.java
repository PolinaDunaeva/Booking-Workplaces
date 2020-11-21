package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Office;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class OfficeEssentialDTO {

    private Integer id;
    private String name;
    private String city;
    private String country;

    public OfficeEssentialDTO(Office office) {
        this.id = office.getId();
        this.name = office.getName();
        this.city = office.getCity().getName();
        this.country = office.getCity().getCountry().getName();
    }
}
