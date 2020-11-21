package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.payload.AddItemsRequest;
import com.hotdesk.hotdesk.payload.RemoveItemsRequest;
import org.springframework.stereotype.Service;

@Service
public interface ItemsService {
    void addItems(AddItemsRequest addItemsRequest) throws RuntimeException;
    void removeItems(RemoveItemsRequest removeItemsRequest) throws RuntimeException;
}
