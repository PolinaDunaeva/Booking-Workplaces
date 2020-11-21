package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.dto.CityDTO;
import com.hotdesk.hotdesk.services.interfaces.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CityController {

    @Autowired
    CityService cityService;

    @GetMapping("/cities")
    public List<CityDTO> getAllCities() {
        return cityService.getAllCities();
    }

    @PostMapping("office_manager/city")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> addCity(@RequestParam String name, @RequestParam String country) {
        try {
            cityService.addCity(name, country);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("office_manager/city")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> removeCity(@RequestParam String name) {
        try {
            cityService.removeCity(name);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
            