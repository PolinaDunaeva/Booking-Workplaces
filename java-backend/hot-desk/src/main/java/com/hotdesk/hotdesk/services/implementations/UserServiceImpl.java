package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.dto.DeskBookingDTO;
import com.hotdesk.hotdesk.dto.UserPublicDTO;
import com.hotdesk.hotdesk.model.RolesEnum;
import com.hotdesk.hotdesk.model.User;
import com.hotdesk.hotdesk.repository.RoleRepository;
import com.hotdesk.hotdesk.repository.UserRepository;
import com.hotdesk.hotdesk.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<UserPublicDTO> getAllUsersPublicInfo() {
        return userRepository.findAll().stream()
                .map(UserPublicDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<DeskBookingDTO> getBookings(Integer userId) throws RuntimeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: No user with id " + userId));

        return user.getDeskBookings().stream()
                .map(DeskBookingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserPublicDTO> getFreeUsers() {
        return userRepository.findFree().stream().map(UserPublicDTO::new).collect(Collectors.toList());
    }
  
    @Override
    public List<DeskBookingDTO> getBookingsByAdmin(String userEmail) throws RuntimeException {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Error: no user with email: " + userEmail));

        return user.getDeskBookings().stream()
                .map(DeskBookingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<DeskBookingDTO> getBookingsByHr(Integer userId) throws RuntimeException {

        User hr = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Error: No user with id " + userId));

        return hr.getSubordinates().stream().map(user -> user.getDeskBookings().stream()
                .map(DeskBookingDTO::new)
                .collect(Collectors.toList())).flatMap(List<DeskBookingDTO>::stream).collect(Collectors.toList());

    }
}
