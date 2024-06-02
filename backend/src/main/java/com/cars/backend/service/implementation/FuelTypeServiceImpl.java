package com.cars.backend.service.implementation;

import com.cars.backend.dto.FuelTypeDto;
import com.cars.backend.entity.Engine;
import com.cars.backend.entity.FuelType;
import com.cars.backend.repository.FuelTypeRepository;
import com.cars.backend.service.FuelTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class FuelTypeServiceImpl implements FuelTypeService {
    @Autowired
    private FuelTypeRepository fuelTypeRepository;


    @Override
    public List<FuelTypeDto> getAllFuelTypes() {
        List<FuelType> fuelTypes = fuelTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return fuelTypes.stream()
                .map(FuelType::convertToDto)
                .collect(Collectors.toList());
    }
}
