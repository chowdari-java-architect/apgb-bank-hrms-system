import React, { useState } from "react";
import ProfessionalHRMSDashboard from "./ProfessionalHRMSDashboard";
import EmployeeManagementModule from "./EmployeeManagementModule";
import EmployeeListModule from "./EmployeeListModule";
import EmployeeUpdateModule from "./EmployeeUpdateModule";
import TransferRequestModule from "./TransferRequestModule";
import TransferApprovalDashboard from "./TransferApprovalDashboard";
import TransferOrderGenerationModule from "./TransferOrderGenerationModule";
import VacancyManagementModule from "./VacancyManagementModule";

export default function CombinedHRMSApp() {
    const [activePage, setActivePage] = useState("dashboard");

    const buttonStyle = {
        padding: "10px 18px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    };

    return (
        <div>
            {/* Top Navigation */}
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    padding: "20px",
                    background: "#0f172a"
                }}
            >
                <button
                    onClick={() => setActivePage("dashboard")}
                    style={buttonStyle}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => setActivePage("employee")}
                    style={buttonStyle}
                >
                    Employee Management
                </button>

                <button
                    onClick={() => setActivePage("employeeList")}
                    style={buttonStyle}
                >
                    Employee List
                </button>

                    <button
                        onClick={() => setActivePage("employeeUpdate")}
                        style={buttonStyle}
                    >
                        Employee Update
                    </button>
                <button
                    onClick={() => setActivePage("transfer")}
                    style={buttonStyle}
                >
                    Transfer Portal
                </button>

                <button
                    onClick={() => setActivePage("approval")}
                    style={buttonStyle}
                >
                    HO Transfer Approval
                </button>

                <button
                    onClick={() => setActivePage("orderGeneration")}
                    style={buttonStyle}
                >
                    Transfer Order
                </button>

                <button
                    onClick={() => setActivePage("vacancy")}
                    style={buttonStyle}
                >
                    Vacancy Management
                </button>


            </div>

            {/* Page Switch */}
            {activePage === "dashboard" && <ProfessionalHRMSDashboard />}
            {activePage === "employee" && <EmployeeManagementModule />}
            {activePage === "employeeList" && <EmployeeListModule />}
            {activePage === "employeeUpdate" && <EmployeeUpdateModule />}
            {activePage === "transfer" && <TransferRequestModule />}
            {activePage === "approval" && <TransferApprovalDashboard />}
            {activePage === "orderGeneration" && <TransferOrderGenerationModule />}
            {activePage === "vacancy" && <VacancyManagementModule />}
        </div>
    );
}