package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.dto.UserFullDTO;
import com.hotdesk.hotdesk.security.services.UserDetailsImpl;
import com.hotdesk.hotdesk.services.interfaces.SubordinateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SubordinatesController {

    @Autowired
    SubordinateService subordinateService;

    @PostMapping("/admin/subordinates")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> addSubordinate(@RequestParam String hr, @RequestParam String subordinate) {
        try {
            subordinateService.addSubordinate(hr, subordinate);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/admin/subordinates")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> removeSubordinate(@RequestParam String hr, @RequestParam String subordinate) {
        try {
            subordinateService.removeSubordinate(hr, subordinate);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/hr/subordinates")
    @PreAuthorize("hasAnyRole('HR', 'ADMIN')")
    public List<UserFullDTO> getSubordinates() {
        return subordinateService.getAllSubordinates(
                ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId()
        );
    }

    @GetMapping("/admin/subordinatesbyemail")
    @PreAuthorize("hasRole('ADMIN')")
     public List<UserFullDTO> getSubordinatesByEmail(@RequestParam String hr) {
        return subordinateService.getAllSubordinatesByEmail(hr);
    }

}
