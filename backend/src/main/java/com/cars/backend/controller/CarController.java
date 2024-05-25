package com.cars.backend.controller;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import com.cars.backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping
    Page<CarDto> getAllCars(@RequestBody ListRe quest request) {
        return carService.getAllCars(request);
    }

}
