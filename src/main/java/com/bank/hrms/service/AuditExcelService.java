package com.bank.hrms.service;

import com.bank.hrms.model.AuditObservation;
import com.bank.hrms.repository.AuditObservationRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.Iterator;

@Service
public class AuditExcelService {

    private final AuditObservationRepository repository;

    public AuditExcelService(AuditObservationRepository repository) {
        this.repository = repository;
    }

    public void uploadExcel(MultipartFile file) {
        try (InputStream is = file.getInputStream()) {

            Workbook workbook = WorkbookFactory.create(is);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rows = sheet.iterator();

            // Skip header
            if (rows.hasNext()) rows.next();

            while (rows.hasNext()) {
                Row row = rows.next();

                if (row == null) continue;

                AuditObservation obs = new AuditObservation();

                // Safe string read
                obs.setBranchName(getStringCellValue(row.getCell(0)));

                obs.setAuditType(AuditObservation.AuditType.valueOf(
                        getStringCellValue(row.getCell(1)).toUpperCase().trim()
                ));

                obs.setDescription(getStringCellValue(row.getCell(2)));

                obs.setSeverity(AuditObservation.Severity.valueOf(
                        getStringCellValue(row.getCell(3)).toUpperCase().trim()
                ));

                obs.setAuditDate(getDateCellValue(row.getCell(4)));
                obs.setDueDate(getDateCellValue(row.getCell(5)));

                obs.setCreatedBy("EXCEL_UPLOAD");

                repository.save(obs);
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to process Excel file: " + e.getMessage());
        }
    }

    // 🔹 Helper: Safe String
    private String getStringCellValue(Cell cell) {
        if (cell == null) return "";

        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        }

        return cell.toString();
    }

    // 🔹 Helper: Safe Date
    private LocalDate getDateCellValue(Cell cell) {
        if (cell == null) return null;

        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getLocalDateTimeCellValue().toLocalDate();
        }

        return null;
    }
}