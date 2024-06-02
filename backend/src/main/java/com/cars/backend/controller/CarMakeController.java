package com.cars.backend.controller;

import com.cars.backend.service.CarMakeService;
import com.cars.backend.service.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/car-makes")
public class CarMakeController {
    @Autowired
    private CarMakeService carMakeService;

    @Autowired
    private CarModelService carModelService;

    @GetMapping()
    public ResponseEntity<?>  getAllCarMakes() {
        try {
            return ResponseEntity.ok(carMakeService.getAllCarMakes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching car makes: " + e.getMessage());
        }
    }

    @GetMapping("/{makeId}/models")
    public ResponseEntity<?>  getAllCarModelsByCarMakeId(@PathVariable Long makeId) {
        try {
            return ResponseEntity.ok(carModelService.getAllCarModelsByCarMakeId(makeId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching car models for car make: " + e.getMessage());
        }
    }
}
