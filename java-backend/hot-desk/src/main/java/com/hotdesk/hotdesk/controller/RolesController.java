package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.services.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/roles")
@PreAuthorize("hasRole('ADMIN')")
public class RolesController {

    @Autowired
    RoleService roleService;

    @PostMapping
    public ResponseEntity<String> addRole(@RequestParam String email, @RequestParam String role) {
        try {
            roleService.addRole(email, role);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping
    public ResponseEntity<String> removeRole(@RequestParam String email, @RequestParam String role) {
        try {
            roleService.removeRole(email, role);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
