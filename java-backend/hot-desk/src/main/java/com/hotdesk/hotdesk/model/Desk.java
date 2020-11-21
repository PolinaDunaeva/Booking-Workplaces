package com.hotdesk.hotdesk.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "desks")
public class Desk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @NotBlank
    private Integer x;

    @NonNull
    @NotBlank
    private Integer y;

    @NonNull
    @NotBlank
    @Size(max = 3)
    private Integer dir;

    @NonNull
    @ManyToOne
    @JoinColumn
    private Blueprint blueprint;

    @OneToMany(mappedBy = "desk")
    private Set<DeskBooking> userBookings = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Desk desk = (Desk) o;
        return id.equals(desk.id) &&
                x.equals(desk.x) &&
                y.equals(desk.y) &&
                dir.equals(desk.dir);
    }
}
