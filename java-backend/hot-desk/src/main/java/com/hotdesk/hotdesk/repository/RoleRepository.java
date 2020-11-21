package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Role;
import com.hotdesk.hotdesk.model.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RolesEnum name);
}
