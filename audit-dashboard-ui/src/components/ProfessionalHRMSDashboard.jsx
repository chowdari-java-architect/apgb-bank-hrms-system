import React from "react";

function ProfessionalHRMSDashboard() {
    const cardStyle = {
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        flex: "1",
        minWidth: "220px",
        margin: "10px"
    };

    const sidebarStyle = {
        width: "250px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
    };

    const menuItem = {
        padding: "12px",
        marginBottom: "10px",
        background: "#334155",
        borderRadius: "8px",
        cursor: "pointer"
    };

    return (
        <div style={{ display: "flex", background: "#f8fafc" }}>
            {/* Sidebar */}
            <div style={sidebarStyle}>
                <h2>APGB HRMS</h2>

                <div style={menuItem}>Dashboard</div>
                <div style={menuItem}>Employee Management</div>
                <div style={menuItem}>Transfer Portal</div>
                <div style={menuItem}>Promotion Module</div>
                <div style={menuItem}>Audit Observations</div>
                <div style={menuItem}>Reports</div>
                <div style={menuItem}>Admin Approval</div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: "30px" }}>
                <h1>HR Dashboard</h1>
                <p>Enterprise Banking HRMS Control Center</p>

                {/* Cards */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "30px"
                }}>
                    <div style={cardStyle}>
                        <h3>Total Employees</h3>
                        <h1>7000+</h1>
                        <p>Across APGB Branches</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Pending Transfers</h3>
                        <h1>124</h1>
                        <p>Awaiting Approval</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Promotion Queue</h3>
                        <h1>58</h1>
                        <p>Eligible This Cycle</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>Audit Observations</h3>
                        <h1>312</h1>
                        <p>Open Compliance Items</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div style={{
                    marginTop: "40px",
                    background: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                }}>
                    <h2>Quick Actions</h2>
                    <p>
                        Manage employees, approve transfers,
                        track promotions and monitor audits.
                    </p>

                    <button style={buttonStyle}>Add Employee</button>
                    <button style={buttonStyle}>Approval Queue</button>
                    <button style={buttonStyle}>Reports</button>
                </div>
            </div>
        </div>
    );
}

const buttonStyle = {
    padding: "12px 20px",
    marginRight: "15px",
    marginTop: "20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
};

export default ProfessionalHRMSDashboard;
