package com.cars.backend;

import com.cars.backend.service.CarApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {
    private final CarApiService carApiService;

    @Autowired
    public CommandLineRunnerImpl(CarApiService carApiService) {
        this.carApiService = carApiService;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Running seeders...");
        carApiService.importCars();
    }
}
