package com.cars.backend.service.implementation;

import com.cars.backend.dto.CarApiDto;
import com.cars.backend.entity.*;
import com.cars.backend.repository.*;
import com.cars.backend.service.CarApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CarApiServiceImpl implements CarApiService {

    @Autowired
    private Environment env;

    @Autowired
    private CarMakeRepository carMakeRepository;

    @Autowired
    private CarModelRepository carModelRepository;

    @Autowired
    private EngineRepository engineRepository;

    @Autowired
    private FuelTypeRepository fuelTypeRepository;

    @Autowired
    private TransmissionRepository transmissionRepository;

    @Autowired
    private CarRepository carRepository;

    @Override
    @Transactional
    public void importCars() {
        Logger logger = LoggerFactory.getLogger(CarApiService.class);

        String apiUrl = env.getProperty("car_api_url");
        RestTemplate restTemplate = new RestTemplate();

        if (apiUrl == null ){
           logger.error("Car API url was not provided.");
           return;
        }

        Long numCars = carRepository.count();
        if (numCars > 0) {
            logger.info("Cars already imported.");
            return;
        }

        CarApiDto[] fetchedCars = restTemplate.getForObject(apiUrl, CarApiDto[].class);
        if (fetchedCars == null) {
            logger.error("Failed while fetching cars.");
            return;
        }

        List<Car> newCars = new ArrayList<>();
        for (CarApiDto carApiDto: fetchedCars) {
            Car newCar = new Car();

            CarMake carMake = getCarMake(carApiDto.getMake());
            CarModel carModel = getCarModel(carApiDto.getModel(), carMake);

            newCar.setCarModel(carModel);
            newCar.setColor(carApiDto.getColor());
            newCar.setMileage(carApiDto.getMileage());
            newCar.setHorsepower(carApiDto.getHorsepower());
            newCar.setPrice(carApiDto.getPrice());
            newCar.setOwners(carApiDto.getOwners());
            newCar.setYear(carApiDto.getYear());

            newCar.setEngine(getEngine(carApiDto.getEngine()));
            newCar.setTransmission(getTransmission(carApiDto.getTransmission()));
            newCar.setFuelType(getFuelType(carApiDto.getFuelType()));

            newCars.add(newCar);
        }

        carRepository.saveAll(newCars);
        logger.info("Cars imported successfully.");
    }

    private CarMake getCarMake(String makeName) {
        Optional<CarMake> carMake = carMakeRepository.findByName(makeName);
        if (carMake.isEmpty()) {
            CarMake newCarMake = new CarMake();
            newCarMake.setName(makeName);
            carMakeRepository.save(newCarMake);
            return newCarMake;
        }
        return carMake.get();
    }

    private CarModel getCarModel(String modelName, CarMake carMake) {
        Optional<CarModel> carModel = carModelRepository.findByNameAndCarMakeId(modelName, carMake.getId());
        if (carModel.isEmpty()) {
            CarModel newCarModel = new CarModel();
            newCarModel.setCarMake(carMake);
            newCarModel.setName(modelName);
            carModelRepository.save(newCarModel);
            return newCarModel;
        }
        return carModel.get();
    }

    private Engine getEngine(String engineName) {
        Optional<Engine> engine = engineRepository.findByName(engineName);
        if (engine.isEmpty()) {
            Engine newEngine = new Engine();
            newEngine.setName(engineName);
            engineRepository.save(newEngine);
            return newEngine;
        }
        return engine.get();
    }

    private FuelType getFuelType(String fuelTypeName) {
        Optional<FuelType> fuelType = fuelTypeRepository.findByName(fuelTypeName);
        if (fuelType.isEmpty()) {
            FuelType newFuelType = new FuelType();
            newFuelType.setName(fuelTypeName);
            fuelTypeRepository.save(newFuelType);
            return newFuelType;
        }
        return fuelType.get();
    }

    private Transmission getTransmission(String transmissionName) {
        Optional<Transmission> transmission = transmissionRepository.findByName(transmissionName);
        if (transmission.isEmpty()) {
            Transmission newTransmission = new Transmission();
            newTransmission.setName(transmissionName);
            transmissionRepository.save(newTransmission);
            return newTransmission;
        }
        return transmission.get();
    }
}
