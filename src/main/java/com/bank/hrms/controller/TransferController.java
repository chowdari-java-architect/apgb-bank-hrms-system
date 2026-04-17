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

    // ✅ CREATE TRANSFER (NOW GOES THROUGH SERVICE → AUDIT)
    @PostMapping
    public TransferRequest createRequest(@RequestBody TransferRequest request) {
        return transferService.createTransfer(request);
    }

    // ✅ GET ALL
    @GetMapping
    public List<TransferRequest> getAllRequests() {
        return transferService.getAllTransfers();
    }

    // ✅ APPROVE (NOW AUDIT WILL TRIGGER)
    @PutMapping("/{id}/approve")
    public TransferRequest approveRequest(@PathVariable Long id) {
        return transferService.approveTransfer(id);
    }
}