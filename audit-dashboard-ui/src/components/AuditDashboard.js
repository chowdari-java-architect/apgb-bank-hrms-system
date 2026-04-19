import React, { useEffect, useState } from "react";
import axios from "axios";

function AuditDashboard({ onLogout }) {
    const [stats, setStats] = useState({
        total: 0,
        open: 0,
        closed: 0,
        overdue: 0
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/api/dashboard/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(response.data);

        } catch (error) {
            console.error("Dashboard Error:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        onLogout();
    };

    return (
        <div style={{ padding: "30px" }}>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <h2>Audit Tracker Dashboard</h2>

                <button
                    onClick={handleLogout}
                    style={logoutButtonStyle}
                >
                    Logout
                </button>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginTop: "20px"
            }}>

                <div style={cardStyle}>
                    <h3>Total Audits</h3>
                    <p>{stats.total}</p>
                </div>

                <div style={cardStyle}>
                    <h3>Open Cases</h3>
                    <p>{stats.open}</p>
                </div>

                <div style={cardStyle}>
                    <h3>Closed Cases</h3>
                    <p>{stats.closed}</p>
                </div>

                <div style={cardStyle}>
                    <h3>Overdue Cases</h3>
                    <p>{stats.overdue}</p>
                </div>

            </div>
        </div>
    );
}

const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9"
};

const logoutButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

export default AuditDashboard;