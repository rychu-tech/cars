package com.cars.backend.entity;

import com.cars.backend.dto.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;

@Entity
@Table(name="cars")
@Getter
@Setter
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "car_model_id")
    private CarModel carModel;

    @Column(name = "year", nullable = false)
    private Integer year;
    @Column(name = "color", nullable = false, length = 100)
    private String color;

    @Column(name = "mileage", nullable = false)
    private Integer mileage;
    @Column(name = "price", nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "fuel_type_id")
    private FuelType fuelType;

    @Column(name = "owners", nullable = false)
    private Integer owners;

    @Column(name = "horsepower", nullable = false)
    private Integer horsepower;

    @ManyToOne
    @JoinColumn(name = "engine_id")
    private Engine engine;

    @ManyToOne
    @JoinColumn(name = "transmission_id")
    private Transmission transmission;

    public static CarDto convertToDto(Car car) {
        CarDto carDto = new CarDto();

        EngineDto engineDto = new EngineDto();
        engineDto.setId(car.getEngine().getId());
        engineDto.setName(car.getEngine().getName());

        carDto.setEngineDto(engineDto);
        carDto.setId(car.getId());

        CarModelDto carModelDto = new CarModelDto();
        carModelDto.setId(car.getCarModel().getId());
        carModelDto.setName(car.getCarModel().getName());
        carModelDto.setMakeId(car.getCarModel().getCarMake().getId());
        carModelDto.setMakeName(car.getCarModel().getCarMake().getName());

        carDto.setCarModelDto(carModelDto);
        carDto.setHorsepower(car.getHorsepower());
        carDto.setMileage(car.getMileage());
        carDto.setColor(car.getColor());
        carDto.setOwners(car.getOwners());
        carDto.setYear(car.getYear());
        carDto.setPrice(car.getPrice());

        TransmissionDto transmissionDto = new TransmissionDto();
        transmissionDto.setId(car.getTransmission().getId());
        transmissionDto.setName(car.getTransmission().getName());

        carDto.setTransmissionDto(transmissionDto);

        FuelTypeDto fuelTypeDto = new FuelTypeDto();
        fuelTypeDto.setId(car.getFuelType().getId());
        fuelTypeDto.setName(car.getFuelType().getName());

        carDto.setFuelTypeDto(fuelTypeDto);

        return carDto;
    }
}
