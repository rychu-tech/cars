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
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
}
