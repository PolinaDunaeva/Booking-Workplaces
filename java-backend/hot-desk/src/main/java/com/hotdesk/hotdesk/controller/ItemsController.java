package com.hotdesk.hotdesk.controller;

import com.hotdesk.hotdesk.payload.AddItemsRequest;
import com.hotdesk.hotdesk.payload.RemoveItemsRequest;
import com.hotdesk.hotdesk.services.interfaces.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItemsController {

    @Autowired
    ItemsService itemsService;

    @PostMapping("/office_manager/items")
    @PreAuthorize("hasAnyRole('OFFICE_MANAGER', 'ADMIN')")
    public ResponseEntity<String> addItems(@RequestBody AddItemsRequest addItemsRequest) {
        try {
            itemsService.addItems(addItemsRequest);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/office_manager/items")
    @PreAuthorize("hasAnyRole('OFFICE_MANAGER', 'ADMIN')")
    public ResponseEntity<String> removeItems(@RequestBody RemoveItemsRequest removeItemsRequest) {
        try {
            itemsService.removeItems(removeItemsRequest);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
