package com.cars.backend.repository;

import com.cars.backend.entity.CarMake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarMakeRepository extends JpaRepository<CarMake, Long> {
    Optional<CarMake> findByName(String name);
}
