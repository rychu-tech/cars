package com.cars.backend.service.implementation;

import com.cars.backend.dto.CarDto;
import com.cars.backend.dto.request.ListRequest;
import com.cars.backend.entity.Car;
import com.cars.backend.repository.CarRepository;
import com.cars.backend.service.CarService;
import com.cars.backend.service.PageableService;
import com.cars.backend.utils.CarExcelGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PageableService pageableService;

    @Override
    public Page<CarDto> getAllCars(ListRequest request) {
        Pageable pageable = Pageable.unpaged();
        if(request.getNumElementsOnPage() != 0) {
            pageable = pageableService.filterOrderPaginate(request);
        }
        Page<Car> carsFromDb = carRepository.findAll(pageable);
        return carsFromDb.map(Car::convertToDto);
    }

    @Override
    public Boolean deleteCar(Long carId) {
        Optional<Car> car = carRepository.findById(carId);
        if (car.isPresent()) {
            Car foundCar = car.get();
            foundCar.setActive(false);
            carRepository.save(foundCar);
            return true;
        }
        return false;
    }

    @Override
    public Boolean restoreCar(Long carId) {
        Optional<Car> car = carRepository.findById(carId);
        if (car.isPresent()) {
            Car foundCar = car.get();
            foundCar.setActive(true);
            carRepository.save(foundCar);
            return true;
        }
        return false;
    }

    @Override
    public void exportCarsToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/octet-stream");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=cars_" + currentDateTime + ".xlsx";
        response.setHeader(headerKey, headerValue);

        ListRequest request = new ListRequest();
        request.setPageId(0);
        request.setSortColumnName("id");
        request.setSortDirection("asc");
        request.setNumElementsOnPage(0);
        Page<CarDto> cars = getAllCars(request);
        List<CarDto> carsList = cars.getContent();
        CarExcelGenerator generator = new CarExcelGenerator(carsList);
        generator.generateExcelFile(response);
    }
}
