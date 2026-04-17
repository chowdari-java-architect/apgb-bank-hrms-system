package com.bank.hrms.controller;

import com.bank.hrms.model.AuditObservation;
import com.bank.hrms.service.AuditObservationService;
import com.bank.hrms.service.AuditExcelService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/audit-observations")
@CrossOrigin("*")
public class AuditObservationController {

    private final AuditObservationService service;
    private final AuditExcelService excelService;

    // ✅ Constructor Injection
    public AuditObservationController(AuditObservationService service,
                                      AuditExcelService excelService) {
        this.service = service;
        this.excelService = excelService;
    }

    // ✅ CREATE (Manual Entry)
    @PostMapping
    public AuditObservation create(@RequestBody AuditObservation obs) {
        return service.create(obs);
    }

    // ✅ GET ALL
    @GetMapping
    public List<AuditObservation> getAll() {
        return service.getAll();
    }

    // ✅ GET BY BRANCH
    @GetMapping("/branch/{branch}")
    public List<AuditObservation> getByBranch(@PathVariable String branch) {
        return service.getByBranch(branch);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public AuditObservation update(
            @PathVariable Long id,
            @RequestParam String remarks,
            @RequestParam String status) {

        return service.update(id, remarks, status);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Deleted successfully";
    }

    // 🔥 🔥 THIS IS YOUR EXCEL API 🔥 🔥
    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file) {
        excelService.uploadExcel(file);
        return "Excel uploaded successfully!";
    }
}