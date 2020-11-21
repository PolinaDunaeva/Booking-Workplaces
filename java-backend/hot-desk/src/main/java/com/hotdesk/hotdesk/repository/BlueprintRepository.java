package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Blueprint;
import com.hotdesk.hotdesk.model.Office;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BlueprintRepository extends JpaRepository<Blueprint, Long> {
    Optional<Blueprint> findByFloorAndOffice(Integer floor, Office office);
}
