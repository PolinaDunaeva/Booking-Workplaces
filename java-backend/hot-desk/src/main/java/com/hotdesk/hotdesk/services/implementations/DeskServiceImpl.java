package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.dto.DeskBookingDTO;
import com.hotdesk.hotdesk.model.*;
import com.hotdesk.hotdesk.payload.AddDeskRequest;
import com.hotdesk.hotdesk.repository.*;
import com.hotdesk.hotdesk.services.interfaces.DeskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeskServiceImpl implements DeskService {

    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    BlueprintRepository blueprintRepository;

    @Autowired
    DeskRepository deskRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void addDesk(AddDeskRequest addDeskRequest) throws RuntimeException {
        Office office = officeRepository.findById(addDeskRequest.getOffice())
                .orElseThrow(() -> new RuntimeException("Error: No office with id " + addDeskRequest.getOffice()));

        Blueprint blueprint = blueprintRepository.findByFloorAndOffice(addDeskRequest.getFloor(), office)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Error: No floor %d in office %d", addDeskRequest.getFloor(), addDeskRequest.getOffice())
                ));

        Desk desk = new Desk(
                addDeskRequest.getX(),
                addDeskRequest.getY(),
                addDeskRequest.getDir(),
                blueprint
        );

        deskRepository.save(desk);
    }

    @Override
    public void removeDesk(Integer id) throws RuntimeException {
        Desk desk = deskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: No desk with id " + id));

        deskRepository.delete(desk);
    }

    @Override
    public List<DeskBookingDTO> getDeskBookings(Integer id) throws RuntimeException {
        Desk desk = deskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: No desk with id " + id));

        return desk.getUserBookings().stream()
                .map(DeskBookingDTO::new)
                .collect(Collectors.toList());
    }

}
