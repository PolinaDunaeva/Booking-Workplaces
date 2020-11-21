package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.payload.AddDeskBookingRequest;

import java.time.LocalDate;

public interface DeskBookingService {
    void addDeskBooing(Integer userId, AddDeskBookingRequest addDeskBookingRequest) throws RuntimeException;
    void removeDeskBooking(Integer userId, Integer deskId, LocalDate date) throws RuntimeException;
}
