package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.dto.CityDTO;
import com.hotdesk.hotdesk.model.City;
import com.hotdesk.hotdesk.model.Country;
import com.hotdesk.hotdesk.repository.CityRepository;
import com.hotdesk.hotdesk.repository.CountryRepository;
import com.hotdesk.hotdesk.services.interfaces.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityServiceImpl implements CityService {

    @Autowired
    CityRepository cityRepository;

    @Autowired
    CountryRepository countryRepository;

    @Override
    public void addCity(String name, String country) throws RuntimeException {
        if (cityRepository.findByName(name).isPresent()) {
            throw new RuntimeException(
                    String.format("Error: %s already exists", name)
            );
        }

        Country cityCountry = countryRepository.findByName(country)
            .orElseThrow(() -> new RuntimeException("Error: no country " + country));

        City city = new City(name, cityCountry);
        cityRepository.save(city);
    }

    @Override
    public void removeCity(String name) throws RuntimeException {
        City city = cityRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Error: no city " + name));
        cityRepository.delete(city);
    }

    @Override
    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream()
                .map(CityDTO::new)
                .collect(Collectors.toList());
    }
}
