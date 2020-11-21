package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.payload.AddBlueprintRequest;
import com.hotdesk.hotdesk.services.interfaces.BlueprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class BlueprintController {

    @Autowired
    BlueprintService blueprintService;

    @PostMapping("/office_manager/blueprint")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> addBlueprint(@RequestBody AddBlueprintRequest addBlueprintRequest) {
        try {
            blueprintService.addBlueprint(addBlueprintRequest);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/office_manager/blueprint")
    @PreAuthorize("hasAnyRole('ADMIN', 'OFFICE_MANAGER')")
    public ResponseEntity<String> removeBlueprint(@RequestParam Integer office, @RequestParam Integer floor) {
        try {
            blueprintService.removeBlueprint(office, floor);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
