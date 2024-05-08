package com.cars.backend.controller;

import com.cars.backend.config.security.TokenProvider;
import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.entity.User;
import com.cars.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;
    @Autowired
    private TokenProvider tokenService;
    @PostMapping("/login")
    public UserDto login(@RequestBody @Validated LoginRequest request) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(request.login(), request.password());

        Authentication authUser = authenticationManager.authenticate(usernamePassword);
        var accessToken = tokenService.generateAccessToken((User) authUser.getPrincipal());
        UserDto userDto = new UserDto();
        userDto.setId(((User) authUser.getPrincipal()).getId());
        userDto.setRole(((User) authUser.getPrincipal()).getRole());
        userDto.setLogin(((User) authUser.getPrincipal()).getUsername());
        userDto.setAccessToken(accessToken);
        return userDto;
    }
}
