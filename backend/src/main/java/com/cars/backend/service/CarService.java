package com.cars.backend.service;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import org.springframework.data.domain.Page;

public interface CarService {
    Page<CarDto> getAllCars(ListRequest request);
    Boolean deleteCar(Long carId);
    Boolean restoreCar(Long carId);

}
