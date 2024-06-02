package com.cars.backend.controller;

import com.cars.backend.service.FuelTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/fuel-types")
public class FuelTypeController {
    @Autowired
    private FuelTypeService fuelTypeService;

    @GetMapping
    public ResponseEntity<?> getAllFuelTypes() {
        try {
            return ResponseEntity.ok(fuelTypeService.getAllFuelTypes());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching fuel types: " + e.getMessage());
        }
    }
}
