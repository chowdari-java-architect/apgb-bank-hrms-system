import React, { useEffect, useState } from "react";
import axios from "axios";


function DashboardCards() {
    const [summary, setSummary] = useState({
        totalEmployees: 0,
        pendingTransfers: 0,
        approvedTransfers: 0,
        rejectedTransfers: 0,
        totalVacancies: 0,
        generatedOrders: 0
    });

    useEffect(() => {
        fetchDashboardSummary();
    }, []);

    const fetchDashboardSummary = async () => {
        try {
            const response = await axios.get(
                "http://3.6.88.154:8080/dashboard/summary"
            );

            setSummary(response.data);
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        }
    };

    const cardStyle = {
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        textAlign: "center",
        minWidth: "220px"
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1 style={{ marginBottom: "30px" }}>
                HRMS Dashboard Summary
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px"
                }}
            >
                <div style={cardStyle}>
                    <h3>Total Employees</h3>
                    <h2>{summary.totalEmployees}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Pending Transfers</h3>
                    <h2>{summary.pendingTransfers}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Approved Transfers</h3>
                    <h2>{summary.approvedTransfers}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Rejected Transfers</h3>
                    <h2>{summary.rejectedTransfers}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Total Vacancies</h3>
                    <h2>{summary.totalVacancies}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Generated Orders</h3>
                    <h2>{summary.generatedOrders}</h2>
                </div>
            </div>
        </div>
    );
}

export default DashboardCards;