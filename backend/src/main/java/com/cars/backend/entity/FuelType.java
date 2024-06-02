package com.cars.backend.entity;

import com.cars.backend.dto.EngineDto;
import com.cars.backend.dto.FuelTypeDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fuel_types")
@Getter
@Setter
public class FuelType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    public static FuelTypeDto convertToDto(FuelType fuelType) {
        FuelTypeDto fuelTypeDto = new FuelTypeDto();
        fuelTypeDto.setId(fuelType.getId());
        fuelTypeDto.setName(fuelType.getName());
        return fuelTypeDto;
    }
}
