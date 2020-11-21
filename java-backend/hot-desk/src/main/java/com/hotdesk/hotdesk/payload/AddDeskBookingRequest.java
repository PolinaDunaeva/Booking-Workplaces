package com.hotdesk.hotdesk.payload;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class AddDeskBookingRequest {
    private Integer deskId;
    private LocalDate date;
    private LocalTime from;
    private LocalTime to;
}
