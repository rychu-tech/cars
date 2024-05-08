package com.cars.backend;

import com.cars.backend.service.CarApiService;
import com.cars.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {
    private final CarApiService carApiService;
    private final UserService userService;

    @Autowired
    public CommandLineRunnerImpl(
            CarApiService carApiService,
            UserService userService
    ) {
        this.carApiService = carApiService;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        carApiService.importCars();
        userService.generateAdminUser();
    }
}
