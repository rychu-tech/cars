package com.cars.backend.repository;

import com.cars.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<User, Long> {
    UserDetails findByLogin(String login);
}