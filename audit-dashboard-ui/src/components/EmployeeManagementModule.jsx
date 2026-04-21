import React, { useState } from "react";

function EmployeeManagementModule() {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        designation: "",
        scale: "",
        postingType: "",
        region: "",
        branch: "",
        hoDepartment: "",
        joiningDate: ""
    });

    const regionalOffices = [
        "Srikakulam RO",
        "Vizianagaram RO",
        "Visakhapatnam RO",
        "Rajahmundry RO",
        "Vijayawada RO",
        "Guntur RO"
    ];

    const hoDepartments = [
        "HR Department",
        "IT Department",
        "Audit Department",
        "Recovery Department",
        "Accounts Department",
        "Legal Department",
        "Administration Department"
    ];

    const branchMap = {
        "Srikakulam RO": ["Palasa Branch", "Tekkali Branch", "Amadalavalasa Branch"],
        "Vizianagaram RO": ["Vizianagaram Main", "Bobbili Branch"],
        "Visakhapatnam RO": ["Gajuwaka Branch", "MVP Colony Branch"],
        "Rajahmundry RO": ["Kakinada Branch", "Amalapuram Branch"],
        "Vijayawada RO": ["Benz Circle Branch", "Machilipatnam Branch"],
        "Guntur RO": ["Guntur Main", "Tenali Branch"]
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://3.6.88.154:8080/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Employee Saved Successfully");
            } else {
                alert("Save Failed");
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

    return (
        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h1>Employee Management</h1>
            <p>APGB Enterprise HRMS Employee Creation</p>

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    maxWidth: "800px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                }}
            >
                <input
                    name="employeeId"
                    placeholder="Employee ID"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="employeeName"
                    placeholder="Employee Name"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="scale"
                    placeholder="Scale"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <select
                    name="postingType"
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Posting Type</option>
                    <option value="BRANCH">BRANCH</option>
                    <option value="HEAD_OFFICE">HEAD OFFICE</option>
                </select>

                {formData.postingType === "BRANCH" && (
                    <>
                        <select
                            name="region"
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="">Select Regional Office</option>
                            {regionalOffices.map((ro) => (
                                <option key={ro} value={ro}>
                                    {ro}
                                </option>
                            ))}
                        </select>

                        <select
                            name="branch"
                            onChange={handleChange}
                            style={inputStyle}
                        >
                            <option value="">Select Branch</option>
                            {(branchMap[formData.region] || []).map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                {formData.postingType === "HEAD_OFFICE" && (
                    <select
                        name="hoDepartment"
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select HO Department</option>
                        {hoDepartments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    type="date"
                    name="joiningDate"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    onClick={handleSubmit}
                    style={{
                        padding: "12px 20px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Save Employee
                </button>
            </div>
        </div>
    );
}

export default EmployeeManagementModule;