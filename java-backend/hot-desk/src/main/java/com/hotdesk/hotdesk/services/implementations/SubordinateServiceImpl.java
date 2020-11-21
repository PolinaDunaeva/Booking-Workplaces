package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.dto.UserFullDTO;
import com.hotdesk.hotdesk.model.Role;
import com.hotdesk.hotdesk.model.RolesEnum;
import com.hotdesk.hotdesk.model.User;
import com.hotdesk.hotdesk.repository.RoleRepository;
import com.hotdesk.hotdesk.repository.UserRepository;
import com.hotdesk.hotdesk.services.interfaces.SubordinateService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubordinateServiceImpl implements SubordinateService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void addSubordinate(String hrEmail, String subordinateEmail) throws RuntimeException {
        HrAndSubordinate hrAndSubordinate = findHrAndSubordinate(hrEmail, subordinateEmail);

        @SuppressWarnings("OptionalGetWithoutIsPresent") // If there is no HR role we want this to fail
        Role hrRole = roleRepository.findByName(RolesEnum.ROLE_HR).get();
        if (!hrAndSubordinate.hr.getRoles().contains(hrRole)) {
            throw new RuntimeException(
                    String.format("Error: %s does not have HR role", hrEmail)
            );
        }

        if (!hrAndSubordinate.hr.getSubordinates().add(hrAndSubordinate.subordinate)) {
            throw new RuntimeException(
                    String.format("Error: %s is already subordinate of %s", subordinateEmail, hrEmail)
            );
        }

        userRepository.save(hrAndSubordinate.hr);
    }

    @Override
    public void removeSubordinate(String hrEmail, String subordinateEmail) throws RuntimeException {
        HrAndSubordinate hrAndSubordinate = findHrAndSubordinate(hrEmail, subordinateEmail);

        if (!hrAndSubordinate.hr.getSubordinates().remove(hrAndSubordinate.subordinate)) {
            throw new RuntimeException(
                    String.format("Error: %s is not subordinate of %s", subordinateEmail, hrEmail)
            );
        }

        userRepository.save(hrAndSubordinate.hr);
    }

    @Override
    public List<UserFullDTO> getAllSubordinates(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: No user with id " + userId));

        @SuppressWarnings("OptionalGetWithoutIsPresent")
        Role adminRole = roleRepository.findByName(RolesEnum.ROLE_ADMIN).get();

        if (user.getRoles().contains(adminRole)) {
            return userRepository.findAll().stream()
                    .map(UserFullDTO::new)
                    .collect(Collectors.toList());
        }

        return user.getSubordinates().stream()
                .map(UserFullDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserFullDTO> getAllSubordinatesByEmail(String hrEmail) {
        User hr = userRepository.findByEmail(hrEmail)
                .orElseThrow(() -> new RuntimeException("Error: no user with email: " + hrEmail));

        if (!hr.getRoles().contains(roleRepository.findByName(RolesEnum.ROLE_HR).get())) {
            throw new RuntimeException("User is not HR");
        }
        return hr.getSubordinates().stream()
                .map(UserFullDTO::new)
                .collect(Collectors.toList());
    }

    private HrAndSubordinate findHrAndSubordinate(String hrEmail, String subordinateEmail) throws RuntimeException {
        if (hrEmail.equals(subordinateEmail)) {
            throw new RuntimeException("Error: HR and subordinate can not have same email");
        }

        User hr = userRepository.findByEmail(hrEmail)
                .orElseThrow(() -> new RuntimeException("Error: no user with email: " + hrEmail));
        User subordinate = userRepository.findByEmail(subordinateEmail)
                .orElseThrow(() -> new RuntimeException("Error: no user with email: " + hrEmail));

        return new HrAndSubordinate(hr, subordinate);
    }
}

@AllArgsConstructor
class HrAndSubordinate {
    User hr;
    User subordinate;
}
