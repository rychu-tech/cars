package com.cars.backend.dto;

import com.cars.backend.entity.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CarDto {
    private Long id;
    @JsonProperty("carModel")
    private CarModelDto carModelDto;
    private Integer year;
    private String color;
    private Integer mileage;
    private Integer price;
    @JsonProperty("fuelType")
    private FuelTypeDto fuelTypeDto;
    private Integer owners;
    private Integer horsepower;
    @JsonProperty("engine")
    private EngineDto engineDto;
    @JsonProperty("transmission")
    private TransmissionDto transmissionDto;
    private Boolean active;

    public static Car convertToEntity(CarDto carDto) {
        Car car = new Car();

        car.setId(carDto.getId());

        CarModel carModel = new CarModel();
        carModel.setId(carDto.getCarModelDto().getId());

        CarMake carMake = new CarMake();
        carMake.setId(carDto.getCarModelDto().getMakeId());
        carMake.setName(carDto.getCarModelDto().getMakeName());
        carModel.setCarMake(carMake);
        carModel.setName(carDto.getCarModelDto().getName());
        car.setCarModel(carModel);

        car.setYear(carDto.getYear());
        car.setColor(carDto.getColor());
        car.setMileage(carDto.getMileage());
        car.setPrice(carDto.getPrice());

        FuelType fuelType = new FuelType();
        fuelType.setId(carDto.getFuelTypeDto().getId());
        fuelType.setName(carDto.getFuelTypeDto().getName());
        car.setFuelType(fuelType);

        car.setOwners(carDto.getOwners());
        car.setHorsepower(carDto.getHorsepower());

        Engine engine = new Engine();
        engine.setId(carDto.getEngineDto().getId());
        engine.setName(carDto.getEngineDto().getName());
        car.setEngine(engine);

        Transmission transmission = new Transmission();
        transmission.setId(carDto.getTransmissionDto().getId());
        transmission.setName(carDto.getTransmissionDto().getName());
        car.setTransmission(transmission);

        car.setActive(carDto.getActive());

        return car;
    }
}


