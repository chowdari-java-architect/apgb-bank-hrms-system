package com.bank.hrms.service;

import com.bank.hrms.model.AuditObservation;
import com.bank.hrms.repository.AuditObservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditObservationService {

    private final AuditObservationRepository repository;

    public AuditObservationService(AuditObservationRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public AuditObservation create(AuditObservation obs) {
        obs.setStatus(AuditObservation.Status.OPEN);
        return repository.save(obs);
    }

    // GET ALL
    public List<AuditObservation> getAll() {
        return repository.findAll();
    }

    // GET BY BRANCH
    public List<AuditObservation> getByBranch(String branch) {
        return repository.findByBranchName(branch);
    }

    // UPDATE STATUS + REMARKS
    public AuditObservation update(Long id, String remarks, String status) {
        AuditObservation obs = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Observation not found"));

        obs.setComplianceRemarks(remarks);
        obs.setStatus(AuditObservation.Status.valueOf(status));

        return repository.save(obs);
    }

    // DELETE (optional but useful)
    public void delete(Long id) {
        repository.deleteById(id);
    }
}