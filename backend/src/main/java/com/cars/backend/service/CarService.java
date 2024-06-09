package com.cars.backend.service;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface CarService {
    Page<CarDto> getAllCars(ListRequest request);
    Boolean deleteCar(Long carId);
    Boolean restoreCar(Long carId);
    void exportCarsToExcel(HttpServletResponse response) throws IOException;

    void createCar(CarDto request);
    Boolean editCar(CarDto request);
}
