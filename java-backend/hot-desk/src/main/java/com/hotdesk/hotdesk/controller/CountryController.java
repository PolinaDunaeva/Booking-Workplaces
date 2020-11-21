package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.services.interfaces.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CountryController {

    @Autowired
    CountryService countryService;

    @GetMapping("/countries")
    public List<String> getAllCountries() {
        return countryService.getAllCountries();
    }

    @PostMapping("/office_manager/country")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> addCountry(@RequestParam String name) {
        try {
            countryService.addCountry(name);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/office_manager/country")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> removeCountry(@RequestParam String name) {
        try {
            countryService.removeCountry(name);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
