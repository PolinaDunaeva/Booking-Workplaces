package com.hotdesk.hotdesk.services.implementations;

import com.hotdesk.hotdesk.model.Role;
import com.hotdesk.hotdesk.model.RolesEnum;
import com.hotdesk.hotdesk.model.User;
import com.hotdesk.hotdesk.repository.RoleRepository;
import com.hotdesk.hotdesk.repository.UserRepository;
import com.hotdesk.hotdesk.services.interfaces.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void addRole(String userEmail, String roleName) throws RuntimeException {
        UserAndRole userAndRole = findUserAndRole(userEmail, roleName);

        if (!userAndRole.user.getRoles().add(userAndRole.role)) {
            throw new RuntimeException("Error: user already has this role");
        }

        userRepository.save(userAndRole.user);
    }

    @Override
    public void removeRole(String userEmail, String roleName) throws RuntimeException {
        UserAndRole userAndRole = findUserAndRole(userEmail, roleName);

        if (!userAndRole.user.getRoles().remove(userAndRole.role)) {
            throw new RuntimeException("Error: user does not have this role");
        }

        if (userAndRole.role.getName().equals(RolesEnum.ROLE_HR) &&
            !userAndRole.user.getSubordinates().isEmpty()) {
            throw new RuntimeException("Error: HR still has subordinates. Remove them first to delete role.");
        }

        userRepository.save(userAndRole.user);
    }

    private UserAndRole findUserAndRole(String userEmail, String roleName) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Error: no user with email: " + userEmail));
        RolesEnum role = Arrays.stream(RolesEnum.values())
                .filter(r -> r.getName().equals(roleName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error: no role with name: " + roleName));
        Role userRole = roleRepository.findByName(role)
                .orElseThrow(() -> new RuntimeException("Error: no role with name: " + roleName));

        return new UserAndRole(user, userRole);
    }
}

@AllArgsConstructor
class UserAndRole {
    User user;
    Role role;
}
