package com.cars.backend.dto.request;


public record LoginRequest(
        String login,
        String password) {
}