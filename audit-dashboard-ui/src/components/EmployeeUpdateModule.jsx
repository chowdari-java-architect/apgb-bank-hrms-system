import React, { useState } from "react";

function EmployeeUpdateModule() {
    const [employeeId, setEmployeeId] = useState("");
    const [designation, setDesignation] = useState("");
    const [branch, setBranch] = useState("");
    const [scale, setScale] = useState("");

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    designation,
                    branch,
                    scale
                })
            });

            if (response.ok) {
                alert("Employee Updated Successfully");
                setEmployeeId("");
                setDesignation("");
                setBranch("");
                setScale("");
            } else {
                alert("Failed to update employee");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "8px"
    };

    const buttonStyle = {
        padding: "12px 20px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    };

    return (
        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h1>Update Employee</h1>
            <p>APGB HRMS Employee Update Module</p>

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    maxWidth: "700px",
                    marginTop: "20px"
                }}
            >
                <input
                    type="text"
                    placeholder="Employee Record ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="New Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="New Branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="New Scale"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleUpdate} style={buttonStyle}>
                    Update Employee
                </button>
            </div>
        </div>
    );
}

export default EmployeeUpdateModule;
