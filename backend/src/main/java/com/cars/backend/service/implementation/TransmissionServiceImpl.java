package com.cars.backend.service.implementation;

import com.cars.backend.dto.TransmissionDto;
import com.cars.backend.entity.Transmission;
import com.cars.backend.repository.TransmissionRepository;
import com.cars.backend.service.TransmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TransmissionServiceImpl implements TransmissionService {
    @Autowired
    private TransmissionRepository transmissionRepository;


    @Override
    public List<TransmissionDto> getAllTransmissions() {
        List<Transmission> transmissions = transmissionRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return transmissions.stream()
                .map(Transmission::convertToDto)
                .collect(Collectors.toList());
    }
}
