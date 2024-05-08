package com.cars.backend.service.implementation;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.cars.backend.config.security.TokenProvider;
import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.dto.response.TokensResponse;
import com.cars.backend.entity.User;
import com.cars.backend.enums.UserRole;
import com.cars.backend.repository.UserRepository;
import com.cars.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenProvider tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public void generateAdminUser() {
        UserDetails user = userRepository.findByLogin("admin@admin.pl");
        if (user == null) {
            String encryptedPassword = new BCryptPasswordEncoder().encode("admin");
            User adminUser = new User("admin@admin.pl", encryptedPassword, UserRole.ADMIN);
            userRepository.save(adminUser);
        }
    }

    @Override
    public UserDto login(LoginRequest request) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(request.login(), request.password());
        Authentication authUser = authenticationManager.authenticate(usernamePassword);
        User user = (User) authUser.getPrincipal();

        var accessToken = tokenService.generateAccessToken(user);
        var refreshToken = tokenService.generateRefreshToken(user);

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setRole(user.getRole());
        userDto.setLogin(user.getUsername());
        userDto.setAccessToken(accessToken);
        userDto.setRefreshToken(refreshToken);

        return userDto;
    }

    @Override
    public TokensResponse refreshToken(String refreshToken) throws TokenExpiredException, UsernameNotFoundException {
        if (tokenService.isTokenExpired(refreshToken)) {
            throw new TokenExpiredException("Refresh token has expired!", LocalDateTime.now().toInstant(ZoneOffset.UTC));
        }

        String username = tokenService.validateToken(refreshToken);
        UserDetails user = userRepository.findByLogin(username);

        if (user != null) {
            String newAccessToken = tokenService.generateAccessToken(user);
            String newRefreshToken = tokenService.generateRefreshToken(user);

            TokensResponse tokensResponse = new TokensResponse();
            tokensResponse.setAccessToken(newAccessToken);
            tokensResponse.setRefreshToken(newRefreshToken);
            return tokensResponse;
        }

        throw new UsernameNotFoundException("User not found!");
    }

}
