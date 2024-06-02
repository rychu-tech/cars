package com.cars.backend.service.implementation;

import com.cars.backend.dto.CarModelDto;
import com.cars.backend.entity.CarModel;
import com.cars.backend.repository.CarModelRepository;
import com.cars.backend.service.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarModelServiceImpl implements CarModelService {
    @Autowired
    private CarModelRepository carModelRepository;

    @Override
    public List<CarModelDto> getAllCarModelsByCarMakeId(Long carMakeId) {
        Sort sortByName = Sort.by("name").ascending();

        List<CarModel> cars = carModelRepository.findByCarMakeId(carMakeId, sortByName);

        return cars.stream()
                .map(CarModel::convertToDto)
                .collect(Collectors.toList());
    }
}
