package com.cars.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CarDto {
    private Long id;
    @JsonProperty("car_model")
    private CarModelDto carModelDto;
    private Integer year;
    private String color;
    private Integer mileage;
    private Integer price;
    @JsonProperty("fuel_type")
    private FuelTypeDto fuelTypeDto;
    private Integer owners;
    private Integer horsepower;
    @JsonProperty("engine")
    private EngineDto engineDto;
    @JsonProperty("transmission")
    private TransmissionDto transmissionDto;
}
