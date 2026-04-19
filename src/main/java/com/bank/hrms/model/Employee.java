package com.bank.hrms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Employee Code
    private String employeeId;

    // Employee Name
    private String employeeName;

    // Designation like Manager, Officer, Clerk
    private String designation;

    // JMGS-I, MMGS-II etc.
    private String scale;

    // BRANCH or HEAD_OFFICE
    private String postingType;

    // Regional Office (only for branch posting)
    private String region;

    // Branch Name (only for branch posting)
    private String branch;

    // Head Office Department (only for HO posting)
    private String hoDepartment;

    // Joining Date
    private LocalDate joiningDate;
}