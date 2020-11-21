package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.dto.UserFullDTO;
import com.hotdesk.hotdesk.dto.UserPublicDTO;
import com.hotdesk.hotdesk.security.services.UserDetailsImpl;
import com.hotdesk.hotdesk.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/user")
    public UserFullDTO getUser() {
        return new UserFullDTO(
                (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        );
    }

    @GetMapping("/users")
    public List<UserPublicDTO> getAllUsers() {
        return userService.getAllUsersPublicInfo();
    }

    @GetMapping("/users/free")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserPublicDTO> getFreeUsers() {
        return userService.getFreeUsers();
    }


    @GetMapping("/user/bookings")
    public ResponseEntity<?> getBookings(@RequestParam(required = false) Integer id) {
        try {
            if (id == null) {
                id = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            }

            return new ResponseEntity<>(userService.getBookings(id), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/admin/bookings")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getBookingsByAdmin(@RequestParam String email) {
        try {
            return new ResponseEntity<>(userService.getBookingsByAdmin(email), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/hr/bookings")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> getBookingsByHr(@RequestParam(required = false) Integer id ) {
        try {
            if (id == null) {
                id = ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            }
            return new ResponseEntity<>(userService.getBookingsByHr(id), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}