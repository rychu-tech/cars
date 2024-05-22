package com.cars.backend.service;

import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.dto.response.TokensResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {
    void generateAdminUser();
    UserDto login(LoginRequest request, HttpServletResponse response);
    TokensResponse refreshToken(String refreshToken, HttpServletResponse response);
    void logout(String accessToken, String refreshToken);
    UserDto getUserFromAccessToken(String accessToken, String refreshToken);
}
