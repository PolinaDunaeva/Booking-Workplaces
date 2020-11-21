package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.dto.DeskBookingDTO;
import com.hotdesk.hotdesk.payload.AddDeskRequest;

import java.util.List;

public interface DeskService {
    void addDesk(AddDeskRequest addDeskRequest) throws RuntimeException;
    void removeDesk(Integer id) throws RuntimeException;
    List<DeskBookingDTO> getDeskBookings(Integer id) throws RuntimeException;
}
