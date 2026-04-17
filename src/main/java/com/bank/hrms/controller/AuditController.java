package com.bank.hrms.controller;

import com.bank.hrms.model.AuditLog;
import com.bank.hrms.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@CrossOrigin
public class AuditController {

    @Autowired
    private AuditLogRepository repo;

    @GetMapping
    public List<AuditLog> getAllLogs() {
        return repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}