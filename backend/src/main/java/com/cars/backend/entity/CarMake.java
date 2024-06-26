package com.cars.backend.entity;

import com.cars.backend.dto.CarMakeDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="car_makes")
@Getter
@Setter
public class CarMake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    public static CarMakeDto convertToDto(CarMake carMake) {
        CarMakeDto dto = new CarMakeDto();
        dto.setId(carMake.getId());
        dto.setName(carMake.getName());
        return dto;
    }
}
