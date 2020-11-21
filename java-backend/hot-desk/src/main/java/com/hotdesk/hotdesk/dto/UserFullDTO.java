package com.hotdesk.hotdesk.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.hotdesk.hotdesk.model.Role;
import com.hotdesk.hotdesk.model.RolesEnum;
import com.hotdesk.hotdesk.model.User;
import com.hotdesk.hotdesk.security.services.UserDetailsImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class UserFullDTO {
    private final String email;
    private final String firstname;
    private final String lastname;
    private final List<String> roles;

    public UserFullDTO(UserDetailsImpl userDetails) {
        this.email = userDetails.getUsername();
        this.firstname = userDetails.getFirstname();
        this.lastname = userDetails.getLastname();
        this.roles =  userDetails.getAuthorities().stream()
                .map(grantedAuthority -> Arrays.stream(RolesEnum.values())
                        .filter(r -> r.name().equals(grantedAuthority.getAuthority()))
                        .findFirst())
                .filter(Optional::isPresent)
                .map(r -> r.get().getName())
                .collect(Collectors.toList());
    }

    public UserFullDTO(User user) {
        this.email = user.getEmail();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.roles = user.getRoles().stream()
                .map(role -> role.getName().getName())
                .collect(Collectors.toList());
    }
}
