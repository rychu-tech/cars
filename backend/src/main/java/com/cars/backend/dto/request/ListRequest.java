package com.cars.backend.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListRequest {
    Integer pageId;
    @JsonProperty("numElements")
    Integer numElementsOnPage;
    @JsonProperty("sortBy")
    String sortColumnName;
    String sortDirection;
}
