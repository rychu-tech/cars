package com.cars.backend.service;

import com.cars.backend.dto.request.ListRequest;
import org.springframework.data.domain.Pageable;

public interface PageableService {
    Pageable filterOrderPaginate(ListRequest request);
}
