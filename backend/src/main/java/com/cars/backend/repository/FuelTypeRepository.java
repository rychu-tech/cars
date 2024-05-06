package com.cars.backend.repository;

import com.cars.backend.entity.FuelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FuelTypeRepository extends JpaRepository<FuelType, Long> {
    Optional<FuelType> findByName(String name);
}
