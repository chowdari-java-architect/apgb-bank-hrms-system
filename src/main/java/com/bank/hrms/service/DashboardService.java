package com.bank.hrms.service;

import com.bank.hrms.model.AuditObservation;
import com.bank.hrms.repository.AuditObservationRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final AuditObservationRepository repo;

    public DashboardService(AuditObservationRepository repo) {
        this.repo = repo;
    }

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();

        // Total observations
        long total = repo.count();

        // Open observations
        long open = repo.findByStatus(AuditObservation.Status.OPEN).size();

        // Closed observations
        long closed = repo.findByStatus(AuditObservation.Status.CLOSED).size();

        // Overdue observations
        long overdue = repo.findAll()
                .stream()
                .filter(AuditObservation::isOverdue)
                .count();

        stats.put("total", total);
        stats.put("open", open);
        stats.put("closed", closed);
        stats.put("overdue", overdue);

        return stats;
    }
}