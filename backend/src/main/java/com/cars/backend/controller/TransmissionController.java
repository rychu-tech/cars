package com.cars.backend.controller;

import com.cars.backend.service.TransmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000", allowCredentials = "true")
@RequestMapping(path = "/transmissions")
public class TransmissionController {
    @Autowired
    private TransmissionService transmissionService;

    @GetMapping
    public ResponseEntity<?> getAllTransmissions() {
        try {
            return ResponseEntity.ok(transmissionService.getAllTransmissions());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error fetching transmissions: " + e.getMessage());
        }
    }
}
