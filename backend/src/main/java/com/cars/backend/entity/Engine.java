package com.cars.backend.entity;

import com.cars.backend.dto.CarMakeDto;
import com.cars.backend.dto.EngineDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "engines")
@Getter
@Setter
public class Engine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    public static EngineDto convertToDto(Engine engine) {
        EngineDto engineDto = new EngineDto();
        engineDto.setId(engine.getId());
        engineDto.setName(engine.getName());
        return engineDto;
    }
}
