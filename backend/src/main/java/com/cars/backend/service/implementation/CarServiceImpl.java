package com.cars.backend.service.implementation;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.ListRequest;
import com.cars.backend.entity.Car;
import com.cars.backend.repository.CarRepository;
import com.cars.backend.service.CarService;
import com.cars.backend.service.PageableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PageableService pageableService;

    @Override
    public Page<CarDto> getAllCars(ListRequest request) {
        Pageable pageable = pageableService.filterOrderPaginate(request);
        Page<Car> carsFromDb = carRepository.findAll(pageable);
        return carsFromDb.map(Car::convertToDto);
    }
}
