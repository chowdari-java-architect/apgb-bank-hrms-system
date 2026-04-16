package com.bank.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TransferRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeName;
    private String currentRole;
    private String requestedRole;
    private String reason;
    private String status = "PENDING";
}