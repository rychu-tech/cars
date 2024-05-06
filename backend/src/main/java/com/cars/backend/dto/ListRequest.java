package com.cars.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListRequest {
    @JsonProperty("page_id")
    Integer pageId;
    @JsonProperty("num_elements")
    Integer numElementsOnPage;
    @JsonProperty("sort_by")
    String sortColumnName;
    @JsonProperty("sort_direction")
    String sortDirection;
}
