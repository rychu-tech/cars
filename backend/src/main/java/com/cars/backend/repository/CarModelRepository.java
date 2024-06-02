package com.cars.backend.repository;

import com.cars.backend.entity.CarModel;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Long> {
    Optional<CarModel> findByNameAndCarMakeId(String name, Long carMakeId);
    List<CarModel> findByCarMakeId(Long carMakeId, Sort sort);
}

