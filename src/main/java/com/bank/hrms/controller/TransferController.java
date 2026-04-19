package com.bank.hrms.controller;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.service.TransferService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transfers")
@CrossOrigin("*")
public class TransferController {

    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    // CREATE TRANSFER REQUEST
    @PostMapping
    public TransferRequest createTransfer(
            @RequestBody TransferRequest request) {
        return transferService.createTransfer(request);
    }

    // GET ALL TRANSFERS
    @GetMapping
    public List<TransferRequest> getAllTransfers() {
        return transferService.getAllTransfers();
    }

    // GM FINAL APPROVAL
    @PutMapping("/approve/{id}")
    public TransferRequest approveTransfer(
            @PathVariable Long id) {
        return transferService.approveTransfer(id);
    }
}