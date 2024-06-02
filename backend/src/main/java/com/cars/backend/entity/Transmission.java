package com.cars.backend.entity;

import com.cars.backend.dto.TransmissionDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "transmissions")
@Getter
@Setter
public class Transmission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    public static TransmissionDto convertToDto(Transmission transmission) {
        TransmissionDto dto = new TransmissionDto();
        dto.setId(transmission.getId());
        dto.setName(transmission.getName());
        return dto;
    }
}
