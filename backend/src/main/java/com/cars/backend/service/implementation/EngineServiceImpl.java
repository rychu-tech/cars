package com.cars.backend.service.implementation;

import com.cars.backend.dto.EngineDto;
import com.cars.backend.entity.CarMake;
import com.cars.backend.entity.Engine;
import com.cars.backend.repository.EngineRepository;
import com.cars.backend.service.EngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class EngineServiceImpl implements EngineService {
    @Autowired
    private EngineRepository engineRepository;

    @Override
    public List<EngineDto> getAllEngines() {
        List<Engine> engines = engineRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
        return engines.stream()
                .map(Engine::convertToDto)
                .collect(Collectors.toList());
    }
}
