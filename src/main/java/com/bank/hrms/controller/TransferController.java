package com.bank.hrms.controller;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.service.TransferOrderPdfService;
import com.bank.hrms.service.TransferService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bank.hrms.model.User;
import com.bank.hrms.repository.UserRepository;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/transfers")

@CrossOrigin("*")
public class TransferController {

    private final TransferService transferService;
    private final TransferOrderPdfService pdfService;
    private final UserRepository userRepository;

    public TransferController(
            TransferService transferService,
            TransferOrderPdfService pdfService,
            UserRepository userRepository
    ) {
        this.transferService = transferService;
        this.pdfService = pdfService;
        this.userRepository = userRepository;
    }

    // CREATE TRANSFER REQUEST
    @PostMapping
    public TransferRequest createTransfer(
            @RequestBody TransferRequest request
    ) {
        return transferService.createTransfer(request);
    }

    // GET ALL TRANSFERS
    @GetMapping
    public List<TransferRequest> getAllTransfers() {
        return transferService.getAllTransfers();
    }

    // HR VERIFICATION
    @PutMapping("/verify/{id}")
    public TransferRequest verifyTransfer(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.verifyTransfer(id, role);
    }

    // SENIOR MANAGER APPROVAL
    @PutMapping("/senior-manager-approve/{id}")
    public TransferRequest seniorManagerApprove(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.seniorManagerApprove(id, role);
    }

    // AGM APPROVAL
    @PutMapping("/agm-approve/{id}")
    public TransferRequest agmApprove(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.agmApprove(id, role);
    }
    // GM FINAL APPROVAL
    @PutMapping("/gm-approve/{id}")
    public TransferRequest gmApprove(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.gmApprove(id, role);
    }

    // FINAL TRANSFER ORDER GENERATION
    @PutMapping("/generate-order/{id}")
    public TransferRequest generateTransferOrder(
            @PathVariable Long id,
            @RequestBody TransferRequest updatedData
    ) {
        return transferService.generateTransferOrder(id, updatedData);
    }

    // HR → Forward to Senior Manager
    @PutMapping("/forward-to-sm/{id}")
    public TransferRequest forwardToSeniorManager(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.forwardToSeniorManager(id, role);
    }

    // Senior Manager → Forward to AGM
    @PutMapping("/forward-to-agm/{id}")
    public TransferRequest forwardToAGM(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.forwardToAGM(id, role);
    }

    // AGM → Forward to GM
    @PutMapping("/forward-to-gm/{id}")
    public TransferRequest forwardToGM(
            @PathVariable Long id,
            @RequestParam String role
    ) {
        return transferService.forwardToGM(id, role);
    }

    // COMMON APPROVE API (Auto Route by Stage)
    @PutMapping("/approve/{id}")
    public TransferRequest approveTransfer(
            @PathVariable Long id,
            @RequestParam String role

    )
    {
        TransferRequest request =
                transferService.getTransferById(id);

        if (request == null) {
            throw new RuntimeException("Transfer not found");
        }

        String stage = request.getCurrentApprovalStage();

        if ("HR_VERIFICATION".equals(stage)) {
            return transferService.forwardToSeniorManager(id, role);        }

        if ("SENIOR_MANAGER".equals(stage)) {
            return transferService.forwardToAGM(id, role);        }

        if ("AGM".equals(stage)) {
            return transferService.forwardToGM(id, role);        }

        if ("GM".equals(stage)) {
            return transferService.gmApprove(id, role);
        }

        return request;
    }

    // FINAL REJECT
    @PutMapping("/reject/{id}")
    public TransferRequest rejectTransfer(
            @PathVariable Long id,
            @RequestParam String reason
    ) {
        return transferService.rejectTransfer(id, reason);
    }

    // DOWNLOAD TRANSFER ORDER PDF
    @GetMapping("/download-order/{id}")
    public ResponseEntity<InputStreamResource> downloadTransferOrder(
            @PathVariable Long id
    ) {
        ByteArrayInputStream pdf =
                pdfService.generateTransferOrderPdf(id);

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                "Content-Disposition",
                "attachment; filename=transfer_order_" + id + ".pdf"
        );

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }
}