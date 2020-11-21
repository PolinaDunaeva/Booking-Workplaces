package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.model.Blueprint;
import com.hotdesk.hotdesk.model.Item;
import com.hotdesk.hotdesk.model.Office;
import com.hotdesk.hotdesk.payload.AddItemsRequest;
import com.hotdesk.hotdesk.payload.RemoveItemsRequest;
import com.hotdesk.hotdesk.repository.BlueprintRepository;
import com.hotdesk.hotdesk.repository.ItemRepository;
import com.hotdesk.hotdesk.repository.OfficeRepository;
import com.hotdesk.hotdesk.services.interfaces.ItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemsServiceImpl implements ItemsService {

    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    BlueprintRepository blueprintRepository;

    @Autowired
    ItemRepository itemRepository;

    @Override
    public void addItems(AddItemsRequest addItemsRequest) throws RuntimeException {
        Office office = officeRepository.findById(addItemsRequest.getOffice())
                .orElseThrow(() -> new RuntimeException("Error: No office with id " + addItemsRequest.getOffice()));

        Blueprint blueprint = blueprintRepository.findByFloorAndOffice(addItemsRequest.getFloor(), office)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Error: No floor %d in office %d", addItemsRequest.getFloor(), addItemsRequest.getOffice())
                ));

        addItemsRequest.getItems().forEach(reqItem -> {
            Item item = new Item(
                    reqItem.getX(),
                    reqItem.getY(),
                    reqItem.getType(),
                    blueprint
            );

            itemRepository.save(item);
        });
    }

    @Override
    public void removeItems(RemoveItemsRequest removeItemsRequest) throws RuntimeException {
        removeItemsRequest.getIds().forEach(id -> {
            Item item = itemRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Error: No desk with id " + id));

            itemRepository.delete(item);
        });

    }
}
