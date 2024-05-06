package com.cars.backend.dto;

import lombok.Data;

@Data
public class CarModelDto {
    private Long id;
    private String name;
    private Long makeId;
    private String makeName;
}
