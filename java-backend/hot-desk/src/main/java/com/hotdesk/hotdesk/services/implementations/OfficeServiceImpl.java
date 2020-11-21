package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.dto.OfficeEssentialDTO;
import com.hotdesk.hotdesk.dto.OfficeFloorDTO;
import com.hotdesk.hotdesk.model.Blueprint;
import com.hotdesk.hotdesk.model.City;
import com.hotdesk.hotdesk.model.Office;
import com.hotdesk.hotdesk.repository.BlueprintRepository;
import com.hotdesk.hotdesk.repository.CityRepository;
import com.hotdesk.hotdesk.repository.OfficeRepository;
import com.hotdesk.hotdesk.services.interfaces.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfficeServiceImpl implements OfficeService {

    @Autowired
    CityRepository cityRepository;

    @Autowired
    OfficeRepository officeRepository;

    @Autowired
    BlueprintRepository blueprintRepository;

    @Override
    public void addOffice(String name, String city) throws RuntimeException {
        if (officeRepository.findByName(name).isPresent()) {
            throw new RuntimeException(
                    String.format("Error: %s already exists", name)
            );
        }

        City officeCity = cityRepository.findByName(city)
                .orElseThrow(() -> new RuntimeException("Error: no city " + city));

        Office office = new Office(name, officeCity);
        officeRepository.save(office);
    }

    @Override
    public void removeOffice(Integer id) {
        Office office = officeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: no office with id " + id));

        officeRepository.delete(office);
    }

    @Override
    public List<OfficeEssentialDTO> getAllOffices() {
        return officeRepository.findAll().stream()
                .map(OfficeEssentialDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public OfficeFloorDTO getOffice(Integer office, Integer floor) throws RuntimeException {
        Office officeObj = officeRepository.findById(office)
                .orElseThrow(() -> new RuntimeException("Error: No office with id " + office));

        if (floor == null) {
            floor = officeObj.getBlueprints().stream()
                    .min(Comparator.comparingInt(Blueprint::getFloor))
                    .orElseThrow(() -> new RuntimeException("Error: No floors in office " + officeObj.getName()))
                    .getFloor();
        }

        Integer finalFloor = floor;
        Blueprint blueprint = blueprintRepository.findByFloorAndOffice(floor, officeObj)
                .orElseThrow(() -> new RuntimeException(
                        String.format("Error: No floor %d in office %s", finalFloor, officeObj.getName())
                ));

        return new OfficeFloorDTO(officeObj, blueprint);
    }
}
