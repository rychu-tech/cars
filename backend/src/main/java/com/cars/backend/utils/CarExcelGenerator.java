package com.cars.backend.utils;

import com.cars.backend.dto.CarDto;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.List;

import static org.apache.poi.ss.util.CellUtil.createCell;

public class CarExcelGenerator {
    private List<CarDto> cars;
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public CarExcelGenerator(List<CarDto> cars) {
        this.cars = cars;
        workbook = new XSSFWorkbook();
    }

    private void createCell(Row row, int columnCount, Object valueOfCell, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (valueOfCell instanceof Integer) {
            cell.setCellValue((Integer) valueOfCell);
        } else if (valueOfCell instanceof Long) {
            cell.setCellValue((Long) valueOfCell);
        } else if (valueOfCell instanceof String) {
            cell.setCellValue((String) valueOfCell);
        } else {
            cell.setCellValue((Boolean) valueOfCell);
        }
        cell.setCellStyle(style);
    }

    private void writeHeader() {
        sheet = workbook.createSheet("Cars");
        Row row = sheet.createRow(0);
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(row, 0, "ID", style);
        createCell(row, 1, "Make", style);
        createCell(row, 2, "Model", style);
        createCell(row, 3, "Color", style);
        createCell(row, 4, "Engine Type", style);
        createCell(row, 5, "Year", style);
        createCell(row, 6, "Mileage", style);
        createCell(row, 7, "Fuel Type", style);
        createCell(row, 8, "Transmission", style);
        createCell(row, 9, "Horse Power", style);
        createCell(row, 10, "Previous Owners", style);
        createCell(row, 11, "Price", style);
        createCell(row, 12, "Active", style);
    }

    private void write() {
        int rowCount = 1;
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
        for (CarDto car: cars) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
            createCell(row, columnCount++, car.getId(), style);
            createCell(row, columnCount++, car.getCarModelDto().getMakeName(), style);
            createCell(row, columnCount++, car.getCarModelDto().getName(), style);
            createCell(row, columnCount++, car.getColor(), style);
            createCell(row, columnCount++, car.getEngineDto().getName(), style);
            createCell(row, columnCount++, car.getYear(), style);
            createCell(row, columnCount++, car.getMileage(), style);
            createCell(row, columnCount++, car.getFuelTypeDto().getName(), style);
            createCell(row, columnCount++, car.getTransmissionDto().getName(), style);
            createCell(row, columnCount++, car.getHorsepower(), style);
            createCell(row, columnCount++, car.getOwners(), style);
            createCell(row, columnCount++, car.getPrice(), style);
            createCell(row, columnCount++, car.getActive(), style);
        }
    }

    public void generateExcelFile(HttpServletResponse response) throws IOException {
        writeHeader();
        write();
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();
    }
}
