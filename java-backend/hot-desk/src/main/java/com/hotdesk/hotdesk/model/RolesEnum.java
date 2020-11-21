package com.hotdesk.hotdesk.model;

public enum RolesEnum {
    ROLE_ADMIN("admin"),
    ROLE_OFFICE_MANAGER("office_manager"),
    ROLE_HR("hr");

    private final String name;

    RolesEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
