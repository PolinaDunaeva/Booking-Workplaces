package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Desk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeskRepository extends JpaRepository<Desk, Long> {
    Optional<Desk> findById(Integer id);
}
