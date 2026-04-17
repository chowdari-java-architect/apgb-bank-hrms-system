package com.bank.hrms.repository;

import com.bank.hrms.model.AuditObservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditObservationRepository extends JpaRepository<AuditObservation, Long> {

    List<AuditObservation> findByBranchName(String branchName);

    List<AuditObservation> findByStatus(AuditObservation.Status status);
}