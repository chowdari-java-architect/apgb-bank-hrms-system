package com.bank.hrms.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String actionType;
    private String module;
    private Long recordId;

    private String performedBy;
    private String role;

    @Column(columnDefinition = "TEXT")
    private String oldData;

    @Column(columnDefinition = "TEXT")
    private String newData;

    private String status;
    private String remarks;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters & Setters

    public Long getId() { return id; }

    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }

    public String getModule() { return module; }
    public void setModule(String module) { this.module = module; }

    public Long getRecordId() { return recordId; }
    public void setRecordId(Long recordId) { this.recordId = recordId; }

    public String getPerformedBy() { return performedBy; }
    public void setPerformedBy(String performedBy) { this.performedBy = performedBy; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getOldData() { return oldData; }
    public void setOldData(String oldData) { this.oldData = oldData; }

    public String getNewData() { return newData; }
    public void setNewData(String newData) { this.newData = newData; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}