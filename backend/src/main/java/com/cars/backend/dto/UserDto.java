package com.cars.backend.dto;

import com.cars.backend.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserDto {
    private Long id;
    private String login;
    private UserRole role;
}
