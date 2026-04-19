package com.bank.hrms.service;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.repository.TransferRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransferService {

    private final TransferRequestRepository transferRepo;
    private final AuditService auditService;

    public TransferService(
            TransferRequestRepository transferRepo,
            AuditService auditService
    ) {
        this.transferRepo = transferRepo;
        this.auditService = auditService;
    }

    // CREATE TRANSFER REQUEST
    public TransferRequest createTransfer(TransferRequest request) {

        TransferRequest saved = transferRepo.save(request);

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

    // GET ALL TRANSFERS
    public List<TransferRequest> getAllTransfers() {
        return transferRepo.findAll();
    }

    // GM FINAL APPROVAL
    public TransferRequest approveTransfer(Long id) {

        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        String oldStatus = request.getFinalTransferStatus();

        request.setFinalTransferStatus("APPROVED");

        TransferRequest updated = transferRepo.save(request);

        auditService.log(
                "APPROVE",
                "TRANSFER",
                updated.getId(),
                updated.getEmployeeName(),
                "GM_HR",
                oldStatus,
                "APPROVED",
                "SUCCESS",
                "Final transfer approved by GM"
        );

        return updated;
    }
}