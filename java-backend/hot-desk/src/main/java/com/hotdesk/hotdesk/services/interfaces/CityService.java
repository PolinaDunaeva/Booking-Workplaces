package com.hotdesk.hotdesk.services.interfaces;

import com.hotdesk.hotdesk.dto.CityDTO;

import java.util.List;

public interface CityService {
    void addCity(String name, String country) throws RuntimeException;
    void removeCity(String name) throws RuntimeException;
    List<CityDTO> getAllCities();
}
