package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.payload.AddDeskBookingRequest;
import com.hotdesk.hotdesk.security.services.UserDetailsImpl;
import com.hotdesk.hotdesk.services.interfaces.DeskBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class DeskBookingController {

    @Autowired
    DeskBookingService deskBookingService;

    @PostMapping("/book")
    public ResponseEntity<String> addDeskBooking(@RequestBody AddDeskBookingRequest addDeskBooking) {
        try {
            Integer userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                    .getId();
            deskBookingService.addDeskBooing(userId, addDeskBooking);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/book")
    public ResponseEntity<String> removeDeskBooking(
            @RequestParam Integer desk,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            Integer userId = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                    .getId();
            deskBookingService.removeDeskBooking(userId, desk, date);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
