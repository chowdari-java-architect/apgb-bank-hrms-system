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

    // HR → Forward to Senior Manager
    public TransferRequest forwardToSeniorManager(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setHrVerificationStatus("VERIFIED");
        request.setCurrentApprovalStage("SENIOR_MANAGER");
        request.setReviewedBy("HR Manager");

        return transferRepo.save(request);
    }

    // Senior Manager → Forward to AGM
    public TransferRequest forwardToAGM(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setSeniorManagerApproval("APPROVED");
        request.setCurrentApprovalStage("AGM");
        request.setReviewedBy("Senior Manager HR");

        return transferRepo.save(request);
    }

    // AGM → Forward to GM
    public TransferRequest forwardToGM(Long id) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setAgmApproval("APPROVED");
        request.setCurrentApprovalStage("GM");
        request.setReviewedBy("AGM HR");

        return transferRepo.save(request);
    }

    // Final Reject
    public TransferRequest rejectTransfer(Long id, String reason) {
        TransferRequest request = transferRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transfer request not found"));

        request.setFinalTransferStatus("REJECTED");
        request.setCurrentApprovalStage("REJECTED");
        request.setRejectionReason(reason);

        return transferRepo.save(request);
    }
}