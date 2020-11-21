package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.payload.AddDeskRequest;
import com.hotdesk.hotdesk.repository.UserRepository;
import com.hotdesk.hotdesk.services.interfaces.DeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class DeskController {

    @Autowired
    DeskService deskService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/office_manager/desk")
    @PreAuthorize("hasAnyRole('OFFICE_MANAGER', 'ADMIN')")
    public ResponseEntity<String> addDesk(@RequestBody AddDeskRequest addDeskRequest) {
        try {
            deskService.addDesk(addDeskRequest);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/office_manager/desk")
    @PreAuthorize("hasAnyRole('OFFICE_MANAGER', 'ADMIN')")
    public ResponseEntity<String> removeDesk(@RequestParam Integer id) {
        try {
            deskService.removeDesk(id);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/desk")
    public ResponseEntity<?> getDeskBookings(@RequestParam Integer id) {
        try {
            return new ResponseEntity<>(deskService.getDeskBookings(id), HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
