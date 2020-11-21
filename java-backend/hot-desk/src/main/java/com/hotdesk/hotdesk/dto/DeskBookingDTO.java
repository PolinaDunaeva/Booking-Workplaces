package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.hotdesk.hotdesk.model.DeskBooking;

import java.time.LocalDate;
import java.time.LocalTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class DeskBookingDTO {
    private final String email;
    private final Integer officeId;
    private final Integer floor;
    private final Integer deskId;

    @JsonFormat(pattern = "dd-MM-yyy", shape = JsonFormat.Shape.STRING)
    private final LocalDate date;

    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private final LocalTime from;

    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private final LocalTime to;

    public DeskBookingDTO(DeskBooking deskBooking) {
        this.email = deskBooking.getUser().getEmail();
        this.date = deskBooking.getDate();
        this.from = deskBooking.getFrom();
        this.to = deskBooking.getTo();
        this.officeId = deskBooking.getDesk().getBlueprint().getOffice().getId();
        this.floor = deskBooking.getDesk().getBlueprint().getFloor();
        this.deskId = deskBooking.getDesk().getId();
    }
}
