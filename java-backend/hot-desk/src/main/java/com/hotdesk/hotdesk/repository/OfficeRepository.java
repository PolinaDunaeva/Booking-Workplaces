package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OfficeRepository extends JpaRepository<Office, Long> {
    Optional<Office> findByName(String name);
    Optional<Office> findById(Integer id);
    List<Office> findAll();
}
