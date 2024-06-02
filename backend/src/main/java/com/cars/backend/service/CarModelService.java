package com.cars.backend.service;

import com.cars.backend.dto.CarModelDto;

import java.util.List;

public interface CarModelService {
    List<CarModelDto> getAllCarModelsByCarMakeId(Long carMakeId);
}
