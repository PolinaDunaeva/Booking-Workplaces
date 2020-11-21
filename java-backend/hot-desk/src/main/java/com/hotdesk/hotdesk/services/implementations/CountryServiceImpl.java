package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.model.Country;
import com.hotdesk.hotdesk.repository.CountryRepository;
import com.hotdesk.hotdesk.services.interfaces.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {

    final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    @Override
    public void addCountry(String name) throws RuntimeException {
        if (countryRepository.findByName(name).isPresent()) {
            throw new RuntimeException(
                    String.format("Error: %s already exists", name)
            );
        }
        Country country = new Country(name);
        countryRepository.save(country);
    }

    @Override
    public void removeCountry(String name) throws RuntimeException {
        Country country = countryRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Error: no country " + name));
        countryRepository.delete(country);
    }

    @Override
    public List<String> getAllCountries() {
        return countryRepository.findAll().stream()
                .map(Country::getName)
                .collect(Collectors.toList());
    }
}
