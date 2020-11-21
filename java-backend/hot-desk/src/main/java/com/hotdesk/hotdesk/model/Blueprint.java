package com.hotdesk.hotdesk.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "blueprints")
public class Blueprint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @NotBlank
    private Integer floor;

    @NonNull
    @NotBlank
    private Integer width;

    @NonNull
    @NotBlank
    private Integer height;

    @NonNull
    @ManyToOne
    @JoinColumn
    private Office office;

    @OneToMany(mappedBy = "blueprint")
    private Set<Desk> desks = new HashSet<>();

    @OneToMany(mappedBy = "blueprint")
    private Set<Item> items = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Blueprint blueprint = (Blueprint) o;
        return id.equals(blueprint.id) &&
                floor.equals(blueprint.floor) &&
                width.equals(blueprint.width) &&
                height.equals(blueprint.height);
    }
}
