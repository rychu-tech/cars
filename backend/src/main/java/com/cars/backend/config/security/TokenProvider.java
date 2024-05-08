package com.cars.backend.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.cars.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenProvider {
    @Value("${jwt_secret}")
    private String JWT_SECRET;

    public String generateAccessToken(UserDetails user) {
        return generateToken(user, 2);
    }

    public String generateRefreshToken(UserDetails user) {
        return generateToken(user, 72);
    }

    private String generateToken(UserDetails user, int hoursUntilExpiration) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            return JWT.create()
                    .withSubject(user.getUsername())
                    .withClaim("username", user.getUsername())
                    .withExpiresAt(LocalDateTime.now().plusHours(hoursUntilExpiration).toInstant(ZoneOffset.UTC))
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new JWTCreationException("Error while generating token", exception);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(JWT_SECRET);
            JWT.require(algorithm).build().verify(token);
            return JWT.decode(token).getSubject();
        } catch (TokenExpiredException e) {
            throw e;
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Error while validating token", exception);
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getExpiresAt().toInstant().isBefore(Instant.now());
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Error checking token expiry", exception);
        }
    }
}