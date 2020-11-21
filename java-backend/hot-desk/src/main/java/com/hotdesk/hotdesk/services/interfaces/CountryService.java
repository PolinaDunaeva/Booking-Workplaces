package com.hotdesk.hotdesk.services.interfaces;

import java.util.List;

public interface CountryService {
    void addCountry(String country) throws RuntimeException;
    void removeCountry(String country) throws RuntimeException;
    List<String> getAllCountries();
}
