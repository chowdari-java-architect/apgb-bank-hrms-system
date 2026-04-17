package com.bank.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(
        name = "audit_observations",
        indexes = {
                @Index(name = "idx_branch", columnList = "branch_name"),
                @Index(name = "idx_status", columnList = "status")
        }
)
public class AuditObservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "branch_name")
    private String branchName;

    @Enumerated(EnumType.STRING)
    private AuditType auditType;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Severity severity;

    @Enumerated(EnumType.STRING)
    private Status status = Status.OPEN; // default

    private LocalDate auditDate;
    private LocalDate dueDate;

    @Column(length = 1000)
    private String complianceRemarks;

    // 🔥 Tracking fields
    private String createdBy;
    private LocalDate createdDate;
    private LocalDate lastUpdatedDate;

    // ================= ENUMS =================

    public enum AuditType {
        INTERNAL, RBI, CONCURRENT
    }

    public enum Severity {
        HIGH, MEDIUM, LOW
    }

    public enum Status {
        OPEN, IN_PROGRESS, CLOSED
    }

    // ================= LIFECYCLE METHODS =================

    @PrePersist
    public void onCreate() {
        this.createdDate = LocalDate.now();
        this.lastUpdatedDate = LocalDate.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.lastUpdatedDate = LocalDate.now();
    }

    // ================= BUSINESS LOGIC =================

    public boolean isOverdue() {
        return dueDate != null &&
                LocalDate.now().isAfter(dueDate) &&
                status != Status.CLOSED;
    }

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public AuditType getAuditType() {
        return auditType;
    }

    public void setAuditType(AuditType auditType) {
        this.auditType = auditType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getAuditDate() {
        return auditDate;
    }

    public void setAuditDate(LocalDate auditDate) {
        this.auditDate = auditDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getComplianceRemarks() {
        return complianceRemarks;
    }

    public void setComplianceRemarks(String complianceRemarks) {
        this.complianceRemarks = complianceRemarks;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getLastUpdatedDate() {
        return lastUpdatedDate;
    }

    public void setLastUpdatedDate(LocalDate lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }
}