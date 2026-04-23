package com.bank.hrms.controller;

import com.bank.hrms.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public Map<String, Object> getDashboardSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalEmployees",
                dashboardService.getTotalEmployees());

        summary.put("pendingTransfers",
                dashboardService.getPendingTransfers());

        summary.put("approvedTransfers",
                dashboardService.getApprovedTransfers());

        summary.put("rejectedTransfers",
                dashboardService.getRejectedTransfers());

        summary.put("vacancies",
                dashboardService.getTotalVacancies());

        summary.put("ordersGenerated",
                dashboardService.getGeneratedOrders());

        return summary;
    }
}