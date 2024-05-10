package com.cars.backend.service;

import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.dto.response.TokensResponse;

public interface UserService {
    void generateAdminUser();
    UserDto login(LoginRequest request);
    TokensResponse refreshToken(String refreshToken);
    void logout(String accessToken, String refreshToken);
}
