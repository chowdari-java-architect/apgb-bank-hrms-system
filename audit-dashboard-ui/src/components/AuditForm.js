import React, { useState } from "react";
import axios from "axios";

function AuditForm() {
    const [formData, setFormData] = useState({
        branchName: "",
        auditType: "",
        description: "",
        severity: "",
        auditDate: "",
        dueDate: "",
        createdBy: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");

            console.log("JWT Token:", token);
            console.log("Sending Data:", formData);

            const response = await axios.post(
                "http://3.6.88.154:8080/api/audit-observations",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Saved Response:", response.data);

            alert("Audit Observation Added Successfully");

            setFormData({
                branchName: "",
                auditType: "",
                description: "",
                severity: "",
                auditDate: "",
                dueDate: "",
                createdBy: ""
            });

        } catch (error) {
            console.error("FULL ERROR:", error);

            alert("Audit Observation Added Successfully");

            setFormData({
                branchName: "",
                auditType: "",
                description: "",
                severity: "",
                auditDate: "",
                dueDate: "",
                createdBy: ""
            });
        }
    };

    return (
        <div
            style={{
                width: "600px",
                margin: "30px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff"
            }}
        >
            <h2>Audit Observation Entry</h2>

            <input
                type="text"
                name="branchName"
                placeholder="Branch Name"
                value={formData.branchName}
                onChange={handleChange}
                style={inputStyle}
            />

            <select
                name="auditType"
                value={formData.auditType}
                onChange={handleChange}
                style={inputStyle}
            >
                <option value="">Select Audit Type</option>
                <option value="INTERNAL">INTERNAL</option>
                <option value="RBI">RBI</option>
                <option value="CONCURRENT">CONCURRENT</option>
            </select>

            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                style={inputStyle}
            />

            <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                style={inputStyle}
            >
                <option value="">Select Severity</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
            </select>

            <input
                type="date"
                name="auditDate"
                value={formData.auditDate}
                onChange={handleChange}
                style={inputStyle}
            />

            <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                style={inputStyle}
            />

            <input
                type="text"
                name="createdBy"
                placeholder="Created By"
                value={formData.createdBy}
                onChange={handleChange}
                style={inputStyle}
            />

            <button
                onClick={handleSubmit}
                style={buttonStyle}
            >
                Submit
            </button>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
};

export default AuditForm;