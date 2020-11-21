package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.model.Blueprint;
import com.hotdesk.hotdesk.model.Office;
import com.hotdesk.hotdesk.payload.AddBlueprintRequest;
import com.hotdesk.hotdesk.repository.BlueprintRepository;
import com.hotdesk.hotdesk.repository.OfficeRepository;
import com.hotdesk.hotdesk.services.interfaces.BlueprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlueprintServiceImpl implements BlueprintService {

    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    BlueprintRepository blueprintRepository;

    @Override
    public void addBlueprint(AddBlueprintRequest addBlueprintRequest) throws RuntimeException {
        Office office = officeRepository.findById(addBlueprintRequest.getOffice())
                .orElseThrow(() -> new RuntimeException("Error: No office with id " + addBlueprintRequest.getOffice()));

        Blueprint blueprint = new Blueprint(
                addBlueprintRequest.getFloor(),
                addBlueprintRequest.getWidth(),
                addBlueprintRequest.getHeight(),
                office
        );

        blueprintRepository.save(blueprint);
    }

    @Override
    public void removeBlueprint(Integer office, Integer floor) throws RuntimeException {
        Office blueprintOffice = officeRepository.findById(office)
                .orElseThrow(() -> new RuntimeException("Error: No office with id " + office));

        Blueprint blueprint = blueprintRepository.findByFloorAndOffice(floor, blueprintOffice)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Error: no floor %d in office %s", floor, blueprintOffice.getName())
                ));

        blueprintRepository.delete(blueprint);
    }
}
