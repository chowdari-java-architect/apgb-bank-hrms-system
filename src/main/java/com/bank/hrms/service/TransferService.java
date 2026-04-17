package com.bank.hrms.service;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.repository.TransferRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferService {

    @Autowired
    private TransferRequestRepository transferRepo;

    @Autowired
    private AuditService auditService;

    // ✅ CREATE TRANSFER REQUEST
    public TransferRequest createTransfer(TransferRequest request) {

        TransferRequest saved = transferRepo.save(request);

        // 🔥 AUDIT LOG - CREATE
        auditService.log(
                "CREATE",
                "TRANSFER",
                saved.getId(),
                saved.getEmployeeName(),
                "EMPLOYEE",
                null,
                saved,
                "SUCCESS",
                "Transfer request submitted"
        );

        return saved;
    }

    // ✅ GET ALL TRANSFERS
    public List<TransferRequest> getAllTransfers() {
        return transferRepo.findAll();
    }

    // ✅ APPROVE TRANSFER
    public TransferRequest approveTransfer(Long id) {

        TransferRequest old = transferRepo.findById(id).orElseThrow();

        String oldStatus = old.getStatus();

        old.setStatus("APPROVED");

        TransferRequest updated = transferRepo.save(old);

        // 🔥 AUDIT LOG - APPROVE
        auditService.log(
                "APPROVE",
                "TRANSFER",
                updated.getId(),
                updated.getEmployeeName(),
                "MANAGER",
                oldStatus,
                "APPROVED",
                "SUCCESS",
                "Transfer approved"
        );

        return updated;
    }
}