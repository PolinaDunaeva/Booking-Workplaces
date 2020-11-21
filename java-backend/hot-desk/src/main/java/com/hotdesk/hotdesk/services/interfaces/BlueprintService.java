package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.payload.AddBlueprintRequest;

public interface BlueprintService {
    void addBlueprint(AddBlueprintRequest addBlueprintRequest) throws RuntimeException;
    void removeBlueprint(Integer office, Integer floor) throws RuntimeException;
}
