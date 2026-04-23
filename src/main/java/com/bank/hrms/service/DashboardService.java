package com.bank.hrms.service;

import com.bank.hrms.repository.EmployeeRepository;
import com.bank.hrms.repository.TransferRequestRepository;
import com.bank.hrms.repository.VacancyMasterRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final TransferRequestRepository transferRepository;
    private final VacancyMasterRepository vacancyRepository;

    public DashboardService(
            EmployeeRepository employeeRepository,
            TransferRequestRepository transferRepository,
            VacancyMasterRepository vacancyRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.transferRepository = transferRepository;
        this.vacancyRepository = vacancyRepository;
    }

    public Long getTotalEmployees() {
        return employeeRepository.count();
    }

    public Long getPendingTransfers() {
        return transferRepository.countByFinalTransferStatus("UNDER_PROCESS");
    }

    public Long getApprovedTransfers() {
        return transferRepository.countByFinalTransferStatus("APPROVED");
    }

    public Long getRejectedTransfers() {
        return transferRepository.countByFinalTransferStatus("REJECTED");
    }

    public Long getTotalVacancies() {
        return vacancyRepository.count();
    }

    public Long getGeneratedOrders() {
        return transferRepository.countByOrderGeneratedStatus("GENERATED");
    }
}