package com.cars.backend.service;

import com.cars.backend.dto.TransmissionDto;

import java.util.List;

public interface TransmissionService {
    List<TransmissionDto> getAllTransmissions();
}
