package com.cars.backend.controller;

import com.cars.backend.service.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/engines")
public class EngineController {
    @Autowired
    private EngineService engineService;

    @GetMapping
    public ResponseEntity<?> getAllEngines() {
        try {
            return ResponseEntity.ok(engineService.getAllEngines());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching engines: " + e.getMessage());
        }
    }
}
