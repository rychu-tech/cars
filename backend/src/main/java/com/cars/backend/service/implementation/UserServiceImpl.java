package com.cars.backend.service.implementation;

import com.cars.backend.config.security.TokenProvider;
import com.cars.backend.dto.UserDto;
import com.cars.backend.dto.request.LoginRequest;
import com.cars.backend.entity.User;
import com.cars.backend.enums.UserRole;
import com.cars.backend.repository.UserRepository;
import com.cars.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void generateAdminUser() {
        UserDetails user = userRepository.findByLogin("admin@admin.pl");
        if (user == null) {
            String encryptedPassword = new BCryptPasswordEncoder().encode("admin");
            User adminUser = new User("admin@admin.pl", encryptedPassword, UserRole.ADMIN);
            userRepository.save(adminUser);
        }
    }

}
