package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.dto.OfficeEssentialDTO;
import com.hotdesk.hotdesk.dto.OfficeFloorDTO;

import java.util.List;

public interface OfficeService {
    void addOffice(String name, String city) throws RuntimeException;
    void removeOffice(Integer id);
    List<OfficeEssentialDTO> getAllOffices();
    OfficeFloorDTO getOffice(Integer office, Integer floor) throws RuntimeException;
}
