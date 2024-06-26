package com.cars.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TokenRequest {
    @JsonProperty("refresh_token")
    String refreshToken;

    @JsonProperty("access_token")
    String accessToken;
}
