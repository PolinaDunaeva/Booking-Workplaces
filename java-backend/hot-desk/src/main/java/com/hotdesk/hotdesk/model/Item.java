package com.hotdesk.hotdesk.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "items")

public class Item {
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
    @Size(max = 50)
    private String type;

    @NonNull
    @ManyToOne
    @JoinColumn
    private Blueprint blueprint;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Item item = (Item) o;
        return id.equals(item.id) &&
                x.equals(item.x) &&
                y.equals(item.y);
    }
}
