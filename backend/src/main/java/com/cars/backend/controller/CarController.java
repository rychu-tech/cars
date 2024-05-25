package com.cars.backend.controller;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import com.cars.backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping
    Page<CarDto> getAllCars(@RequestBody ListRequest request) {
        return carService.getAllCars(request);
    }

    @DeleteMapping("/{carId}")
    ResponseEntity<?> deleteCar(@PathVariable Long carId) {
        try {
            return ResponseEntity.ok(carService.deleteCar(carId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting car: " + e.getMessage());
        }
    }

    @PatchMapping("/{carId}")
    ResponseEntity<?> restoreCar(@PathVariable Long carId) {
        try {
            return ResponseEntity.ok(carService.restoreCar(carId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error restoring car: " + e.getMessage());
        }
    }

}
