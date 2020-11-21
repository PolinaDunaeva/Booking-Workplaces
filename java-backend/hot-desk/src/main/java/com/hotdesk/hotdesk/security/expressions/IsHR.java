package com.hotdesk.hotdesk.security.expressions;

import com.hotdesk.hotdesk.security.services.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component(value = "isHR")
public class IsHR {
    public boolean of(Authentication authentication, HttpServletRequest request) {
        String email = request.getParameter("username");
        return ((UserDetailsImpl) authentication.getPrincipal())
                .getSubordinatesEmails()
                .contains(email);
    }
}
