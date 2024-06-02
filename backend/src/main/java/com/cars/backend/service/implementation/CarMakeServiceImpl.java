package com.cars.backend.service.implementation;

import com.cars.backend.dto.CarMakeDto;
import com.cars.backend.entity.CarMake;
import com.cars.backend.repository.CarMakeRepository;
import com.cars.backend.service.CarMakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarMakeServiceImpl implements CarMakeService {
    @Autowired
    private CarMakeRepository carMakeRepository;

    @Override
    public List<CarMakeDto> getAllCarMakes() {
        List<CarMake> cars = carMakeRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return cars.stream()
                .map(CarMake::convertToDto)
                .collect(Collectors.toList());
    }
}
