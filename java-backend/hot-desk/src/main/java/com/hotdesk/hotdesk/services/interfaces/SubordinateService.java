package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.dto.UserFullDTO;

import java.util.List;

public interface SubordinateService {
    void addSubordinate(String hrEmail, String subordinateEmail) throws RuntimeException;
    void removeSubordinate(String hrEmail, String subordinateEmail) throws RuntimeException;
    List<UserFullDTO> getAllSubordinates(Integer userId);
    List<UserFullDTO> getAllSubordinatesByEmail(String hrEmail);
}
