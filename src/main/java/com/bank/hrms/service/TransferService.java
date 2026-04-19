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

    // HR VERIFICATION
    public TransferRequest verifyTransfer(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setHrVerificationStatus("VERIFIED");

        return transferRepo.save(request);
    }

    // SENIOR MANAGER APPROVAL
    public TransferRequest seniorManagerApprove(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setSeniorManagerApproval("APPROVED");

        return transferRepo.save(request);
    }

    // AGM APPROVAL
    public TransferRequest agmApprove(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setAgmApproval("APPROVED");

        return transferRepo.save(request);
    }

    // GM FINAL APPROVAL
    public TransferRequest gmApprove(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setGmApproval("APPROVED");
        request.setFinalTransferStatus("APPROVED");

        return transferRepo.save(request);
    }

    // FINAL TRANSFER ORDER GENERATION
    public TransferRequest generateTransferOrder(
            Long id,
            TransferRequest updatedData) {

        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setApprovedRegion(updatedData.getApprovedRegion());
        request.setApprovedBranch(updatedData.getApprovedBranch());
        request.setEffectiveTransferDate(updatedData.getEffectiveTransferDate());
        request.setTransferRemarks(updatedData.getTransferRemarks());

        request.setOrderGeneratedStatus("GENERATED");

        return transferRepo.save(request);
    }
}