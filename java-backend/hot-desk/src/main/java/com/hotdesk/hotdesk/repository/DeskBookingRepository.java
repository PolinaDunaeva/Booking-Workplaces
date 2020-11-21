package com.hotdesk.hotdesk.repository;

import com.hotdesk.hotdesk.model.Desk;
import com.hotdesk.hotdesk.model.DeskBooking;
import com.hotdesk.hotdesk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DeskBookingRepository extends JpaRepository<DeskBooking, Long> {
    List<DeskBooking> findByUser(User user);
    List<DeskBooking> findByDesk(Desk desk);
    Optional<DeskBooking> findByDeskAndDate(Desk desk, LocalDate date);
    Optional<DeskBooking> findByUserAndDate(User user, LocalDate date);
    Optional<DeskBooking> findByUserAndDeskAndDate(User user, Desk desk, LocalDate date);
}
