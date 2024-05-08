package com.cars.backend.dto.response;

import lombok.Data;

@Data
public class TokensResponse {
    String accessToken;
    String refreshToken;
}
