package com.bank.hrms.controller;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.service.TransferOrderPdfService;
import com.bank.hrms.service.TransferService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/transfers")
@CrossOrigin("*")
public class TransferController {

    private final TransferService transferService;
    private final TransferOrderPdfService pdfService;

    public TransferController(
            TransferService transferService,
            TransferOrderPdfService pdfService
    ) {
        this.transferService = transferService;
        this.pdfService = pdfService;
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
            @PathVariable Long id
    ) {
        return transferService.verifyTransfer(id);
    }

    // SENIOR MANAGER APPROVAL
    @PutMapping("/senior-manager-approve/{id}")
    public TransferRequest seniorManagerApprove(
            @PathVariable Long id
    ) {
        return transferService.seniorManagerApprove(id);
    }

    // AGM APPROVAL
    @PutMapping("/agm-approve/{id}")
    public TransferRequest agmApprove(
            @PathVariable Long id
    ) {
        return transferService.agmApprove(id);
    }

    // GM FINAL APPROVAL
    @PutMapping("/gm-approve/{id}")
    public TransferRequest gmApprove(
            @PathVariable Long id
    ) {
        return transferService.gmApprove(id);
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
            @PathVariable Long id
    ) {
        return transferService.forwardToSeniorManager(id);
    }

    // Senior Manager → Forward to AGM
    @PutMapping("/forward-to-agm/{id}")
    public TransferRequest forwardToAGM(
            @PathVariable Long id
    ) {
        return transferService.forwardToAGM(id);
    }

    // AGM → Forward to GM
    @PutMapping("/forward-to-gm/{id}")
    public TransferRequest forwardToGM(
            @PathVariable Long id
    ) {
        return transferService.forwardToGM(id);
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
                "inline; filename=transfer_order_" + id + ".pdf"
        );

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }
}