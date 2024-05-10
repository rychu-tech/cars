package com.cars.backend.controller;

import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.dto.request.TokenRequest;
import com.cars.backend.dto.request.RefreshTokenRequest;
import com.cars.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserDto login(@RequestBody @Validated LoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestBody RefreshTokenRequest request) {
        try {
            return ResponseEntity.ok(userService.refreshToken(request.getRefreshToken()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error processing refresh token: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody TokenRequest request) {
        userService.logout(request.getAccessToken(), request.getRefreshToken());
        return ResponseEntity.ok().body("Logged out successfully.");
    }

    @PostMapping("/check")
    public UserDto check(@RequestBody TokenRequest request) {
        return userService.getUserFromAccessToken(request.getAccessToken(), request.getRefreshToken());
    }
}
