package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.model.Desk;
import com.hotdesk.hotdesk.model.DeskBooking;
import com.hotdesk.hotdesk.model.User;
import com.hotdesk.hotdesk.payload.AddDeskBookingRequest;
import com.hotdesk.hotdesk.repository.DeskBookingRepository;
import com.hotdesk.hotdesk.repository.DeskRepository;
import com.hotdesk.hotdesk.repository.UserRepository;
import com.hotdesk.hotdesk.services.interfaces.DeskBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DeskBookingServiceImpl implements DeskBookingService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    DeskBookingRepository deskBookingRepository;

    @Override
    public void addDeskBooing(Integer userId, AddDeskBookingRequest addDeskBookingRequest) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: No user with id " + userId));

        Desk desk = deskRepository.findById(addDeskBookingRequest.getDeskId())
                .orElseThrow(() -> new RuntimeException("Error: No desk with id " + addDeskBookingRequest.getDeskId()));

        if (deskBookingRepository.findByDeskAndDate(desk, addDeskBookingRequest.getDate()).isPresent()) {
            throw new RuntimeException(
                    String.format(
                            "Error: desk with id %d is already booked at %s",
                            desk.getId(),
                            addDeskBookingRequest.getDate().toString()
                    )
            );
        }

        if (deskBookingRepository.findByUserAndDate(user, addDeskBookingRequest.getDate()).isPresent()) {
            throw new RuntimeException("Error: You have already booked desk at " + addDeskBookingRequest.getDate().toString());
        }

        if (addDeskBookingRequest.getFrom().isAfter(addDeskBookingRequest.getTo())) {
            throw new RuntimeException("Error: Time from can not be after time to. Try switching from and to times");
        }

        DeskBooking deskBooking = new DeskBooking(
                desk,
                user,
                addDeskBookingRequest.getDate(),
                addDeskBookingRequest.getFrom(),
                addDeskBookingRequest.getTo()
        );

        deskBookingRepository.save(deskBooking);
    }

    @Override
    public void removeDeskBooking(Integer userId, Integer deskId, LocalDate date) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: No user with id " + userId));

        Desk desk = deskRepository.findById(deskId)
                .orElseThrow(() -> new RuntimeException("Error: No desk with id " + deskId));

        DeskBooking deskBooking = deskBookingRepository.findByUserAndDeskAndDate(user, desk, date)
                .orElseThrow(() -> new RuntimeException("Error: You do not booked this desk at that date"));

        deskBookingRepository.delete(deskBooking);
    }
}
