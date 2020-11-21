package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.dto.DeskBookingDTO;
import com.hotdesk.hotdesk.dto.UserFullDTO;
import com.hotdesk.hotdesk.dto.UserPublicDTO;

import java.util.List;

public interface UserService {
    List<UserPublicDTO> getAllUsersPublicInfo();
    List<UserPublicDTO> getFreeUsers();
    List<DeskBookingDTO> getBookings(Integer userId) throws RuntimeException;
    List<DeskBookingDTO> getBookingsByAdmin(String email) throws RuntimeException;
    List<DeskBookingDTO> getBookingsByHr(Integer id) throws RuntimeException;
}
