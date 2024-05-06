package com.cars.backend.controller;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.ListRequest;
import com.cars.backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping
    Page<CarDto> getAllCars(@RequestBody ListRequest request) {
        System.out.println("JESTEM");
        return carService.getAllCars(request);
    }

}
