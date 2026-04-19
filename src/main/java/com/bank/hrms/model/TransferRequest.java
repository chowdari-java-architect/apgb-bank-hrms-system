package com.bank.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "transfer_request")
public class TransferRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Employee Details
    private String employeeId;
    private String employeeName;
    private String designation;
    private String scale;

    // Current Posting
    private String currentRegion;
    private String currentBranch;
    private String currentHoDepartment;


    // Transfer Request Details
    private String reasonForTransfer;

    // MEDICAL / SPOUSE / ADMINISTRATIVE / GENERAL
    private String priorityType;

    // Employee Branch Preferences
    private String preference1Region;
    private String preference1Branch;

    private String preference2Region;
    private String preference2Branch;

    private String preference3Region;
    private String preference3Branch;

    // Head Office Approval Workflow

    // PENDING / VERIFIED / REJECTED
    private String hrVerificationStatus = "PENDING";

    // PENDING / APPROVED / REJECTED
    private String seniorManagerApproval = "PENDING";

    // PENDING / APPROVED / REJECTED
    private String agmApproval = "PENDING";

    // FINAL APPROVAL
    private String gmApproval = "PENDING";

    // UNDER_PROCESS / APPROVED / REJECTED
    private String finalTransferStatus = "UNDER_PROCESS";

    // Final Posting after approval
    private String approvedBranch;
    private String approvedRegion;

    // Audit Fields
    private LocalDate requestDate;
    private String createdBy;

    @PrePersist
    public void onCreate() {
        this.requestDate = LocalDate.now();
    }
}