package com.cars.backend.service.implementation;

import com.cars.backend.dto.ListRequest;
import com.cars.backend.service.PageableService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PageableServiceImpl implements PageableService {
    public Pageable filterOrderPaginate(ListRequest request) {
        Sort sortBy =  Sort.by(request.getSortColumnName()).ascending();

        if (Objects.equals(request.getSortDirection(), "desc")) {
            sortBy = Sort.by(request.getSortColumnName()).descending();
        }

        Pageable pageable = PageRequest.of(
                request.getPageId(),
                request.getNumElementsOnPage(),
                sortBy
        );

        return pageable;
    }
}
