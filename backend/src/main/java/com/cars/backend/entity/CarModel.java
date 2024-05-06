package com.cars.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "car_models")
@Getter
@Setter
public class CarModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "car_make_id")
    private CarMake carMake;
}
