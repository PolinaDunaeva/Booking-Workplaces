package com.hotdesk.hotdesk.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "desks_bookings")
public class DeskBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @NotBlank
    @ManyToOne
    @JoinColumn
    private Desk desk;

    @NonNull
    @NotBlank
    @ManyToOne
    @JoinColumn
    private User user;

    @NonNull
    @NotBlank
    @JsonFormat(pattern = "dd-MM-yyy", shape = JsonFormat.Shape.STRING)
    private LocalDate date;

    @NonNull
    @NotBlank
    @Column(name = "from_time")
    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalTime from;

    @NonNull
    @NotBlank
    @Column(name = "to_time")
    @JsonFormat(pattern = "HH:mm", shape = JsonFormat.Shape.STRING)
    private LocalTime to;
}
