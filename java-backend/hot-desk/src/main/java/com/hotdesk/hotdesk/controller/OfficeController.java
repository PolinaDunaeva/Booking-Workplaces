package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.dto.OfficeEssentialDTO;
import com.hotdesk.hotdesk.dto.OfficeFloorDTO;
import com.hotdesk.hotdesk.services.interfaces.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OfficeController {

    @Autowired
    OfficeService officeService;

    @GetMapping("/offices")
    public List<OfficeEssentialDTO> getAllOffices() {
        return officeService.getAllOffices();
    }

    @GetMapping("/office")
    public ResponseEntity<?> getOffice(@RequestParam Integer office, @RequestParam(required = false) Integer floor) {
        try {
            OfficeFloorDTO officeFloorDTO = officeService.getOffice(office, floor);
            return new ResponseEntity<>(officeFloorDTO, HttpStatus.ACCEPTED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/office_manager/office")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> addOffice(@RequestParam String name, @RequestParam String city) {
        try {
            officeService.addOffice(name, city);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/office_manager/office")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> removeOffice(@RequestParam Integer id) {
        try {
            officeService.removeOffice(id);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
