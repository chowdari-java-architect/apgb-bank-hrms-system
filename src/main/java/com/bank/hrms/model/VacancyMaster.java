package com.bank.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "vacancy_master")
public class VacancyMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Regional Office OR Head Office
    private String region;

    // Branch Name OR HO Department
    private String branchOrDepartment;

    // Designation
    private String designation;

    // Scale
    private String scale;

    // Approved Posts
    private Integer sanctionedStrength;

    // Current Employees Working
    private Integer workingStrength;

    // Auto-calculated Vacancy
    private Integer vacantPositions;

    // ACTIVE / CLOSED
    private String vacancyStatus = "ACTIVE";
}