package com.cars.backend.controller;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import com.cars.backend.service.CarService;
import com.cars.backend.utils.CarExcelGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @PostMapping("/view")
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

    @GetMapping("/excel")
    public void exportCarsToExcel(HttpServletResponse response) throws IOException {
        carService.exportCarsToExcel(response);
    }

    @PostMapping
    public ResponseEntity<?> createCar(@RequestBody CarDto request) {
        try {
            carService.createCar(request);
            return ResponseEntity.ok("Successfully created car!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating car: " + e.getMessage());
        }
    }

}
