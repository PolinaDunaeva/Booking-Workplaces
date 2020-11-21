package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer id);
    Boolean existsByEmail(String email);
    List<User> findAll();

    @Query(
            value = " SELECT * FROM users u " +
                    "WHERE NOT EXISTS (SELECT 1 FROM user_hr uh WHERE uh.user_id = u.id) " +
                    "AND NOT EXISTS (SELECT 1 FROM user_roles ur WHERE ur.user_id = u.id)",
            nativeQuery = true)
    List<User> findFree();

}
