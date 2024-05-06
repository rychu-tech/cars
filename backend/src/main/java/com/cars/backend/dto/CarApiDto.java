package com.cars.backend.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CarApiDto {
    Long id;
    String make;
    String model;
    Integer year;
    String color;
    Integer mileage;
    Integer price;
    String fuelType;
    String transmission;
    String engine;
    Integer horsepower;
    List<String> features;
    Integer owners;
    String image;
}
