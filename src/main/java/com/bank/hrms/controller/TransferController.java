package com.bank.hrms.controller;

import com.bank.hrms.model.TransferRequest;
import com.bank.hrms.repository.TransferRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.bank.hrms.model.Employee;
import com.bank.hrms.repository.EmployeeRepository;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
@RequestMapping("/transfers")
@CrossOrigin("*")
public class TransferController {

    private final TransferRequestRepository repository;
    private final EmployeeRepository employeeRepository;

    public TransferController(TransferRequestRepository repository,
                              EmployeeRepository employeeRepository) {
        this.repository = repository;
        this.employeeRepository = employeeRepository;
       }

    @PostMapping
    public TransferRequest createRequest(@RequestBody TransferRequest request) {
        return repository.save(request);
    }

    @GetMapping
    public List<TransferRequest> getAllRequests() {
        return repository.findAll();
    }

    @PutMapping("/{id}/approve")
    public TransferRequest approveRequest(@PathVariable Long id) {
        TransferRequest request = repository.findById(id).orElseThrow();

        request.setStatus("APPROVED");
        repository.save(request);

        employeeRepository.findAll()
                .stream()
                .filter(emp -> emp.getName().trim()
                        .equalsIgnoreCase(request.getEmployeeName().trim()))
                .findFirst()
                .ifPresent(emp -> {
                    emp.setRole(request.getRequestedRole());
                    employeeRepository.save(emp);
                });

        return request;
    }
    @GetMapping("/export")
    public void exportTransfers(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=transfer_report.csv");

        PrintWriter writer = response.getWriter();
        writer.println("ID,Employee,Current Role,Requested Role,Status");

        for (TransferRequest req : repository.findAll()) {
            writer.println(req.getId() + "," +
                    req.getEmployeeName() + "," +
                    req.getCurrentRole() + "," +
                    req.getRequestedRole() + "," +
                    req.getStatus());
        }

        writer.flush();
    }
}