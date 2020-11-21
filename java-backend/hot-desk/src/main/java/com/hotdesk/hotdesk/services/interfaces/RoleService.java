package com.hotdesk.hotdesk.services.interfaces;

public interface RoleService {
    void addRole(String userEmail, String roleName) throws RuntimeException;
    void removeRole(String userEmail, String roleName) throws RuntimeException;
}
