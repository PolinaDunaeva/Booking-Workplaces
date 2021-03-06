package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> findById(Integer id);
}
