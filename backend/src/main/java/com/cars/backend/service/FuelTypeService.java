package com.cars.backend.service;

import com.cars.backend.dto.FuelTypeDto;

import java.util.List;

public interface FuelTypeService {
    List<FuelTypeDto> getAllFuelTypes();
}
