import React, { useState } from "react";

function TransferRequestModule() {
    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        designation: "",
        scale: "",
        currentRegion: "",
        currentBranch: "",
        currentHoDepartment: "",
        reasonForTransfer: "",
        priorityType: "",
        preference1Region: "",
        preference1Branch: "",
        preference2Region: "",
        preference2Branch: "",
        preference3Region: "",
        preference3Branch: "",
        createdBy: ""
    });

    const regionalOffices = [
        "Head Office - Guntur",
        "Srikakulam RO",
        "Vizianagaram RO",
        "Visakhapatnam RO",
        "Anakapalli RO",
        "Kakinada RO",
        "Konaseema RO",
        "East Godavari RO",
        "West Godavari RO",
        "Eluru RO",
        "Krishna RO",
        "NTR RO",
        "Guntur RO",
        "Bapatla RO",
        "Palnadu RO",
        "Prakasam RO",
        "SPSR Nellore RO",
        "Kurnool RO",
        "Nandyal RO",
        "Anantapur RO",
        "Sri Sathya Sai RO",
        "YSR Kadapa RO",
        "Chittoor RO",
        "Tirupati RO"
    ];

    const hoDepartments = [
        "HR Department",
        "IT Department",
        "Inspection Department",
        "Audit Department",
        "Recovery Department",
        "Accounts Department",
        "Legal Department",
        "Administration Department",
        "Credit Department",
        "Vigilance Department"
    ];

    const branchMap = {
        "Srikakulam RO": ["Palasa", "Tekkali", "Ichapuram", "Amadalavalasa"],
        "Vizianagaram RO": ["Vizianagaram", "Bobbili", "Cheepurupalli"],
        "Visakhapatnam RO": ["MVP Colony", "Gajuwaka", "Madhurawada"],
        "Guntur RO": ["Guntur", "Mangalagiri", "Ponnur", "Repalle"],
        "Krishna RO": ["Machilipatnam", "Gudivada", "Avanigadda"],
        "Tirupati RO": ["Tirupati", "Srikalahasti", "Renigunta"]
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
            const response = await fetch("http://localhost:8080/transfers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Transfer Request Submitted Successfully");
            } else {
                alert("Failed to submit transfer request");
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

    const renderPreferenceSection = (prefNumber) => {
        const regionField = `preference${prefNumber}Region`;
        const branchField = `preference${prefNumber}Branch`;

        return (
            <>
                <h3>Preference {prefNumber}</h3>

                <select
                    name={regionField}
                    value={formData[regionField]}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Region / Head Office</option>
                    {regionalOffices.map((ro) => (
                        <option key={ro} value={ro}>
                            {ro}
                        </option>
                    ))}
                </select>

                {formData[regionField] === "Head Office - Guntur" ? (
                    <select
                        name={branchField}
                        value={formData[branchField]}
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
                ) : (
                    <select
                        name={branchField}
                        value={formData[branchField]}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Branch</option>
                        {(branchMap[formData[regionField]] || []).map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                )}
            </>
        );
    };

    return (
        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h1>Transfer Request Portal</h1>
            <p>APGB Enterprise Transfer Management System</p>

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    maxWidth: "900px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                }}
            >
                <input
                    name="employeeId"
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="employeeName"
                    placeholder="Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    name="scale"
                    placeholder="Scale"
                    value={formData.scale}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <h2>Current Posting</h2>

                <select
                    name="currentRegion"
                    value={formData.currentRegion}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Current Region / Head Office</option>
                    {regionalOffices.map((ro) => (
                        <option key={ro} value={ro}>
                            {ro}
                        </option>
                    ))}
                </select>

                {formData.currentRegion === "Head Office - Guntur" ? (
                    <select
                        name="currentHoDepartment"
                        value={formData.currentHoDepartment || ""}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Current HO Department</option>
                        {hoDepartments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                ) : (
                    <select
                        name="currentBranch"
                        value={formData.currentBranch}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Current Branch</option>
                        {(branchMap[formData.currentRegion] || []).map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                )}

                <input
                    name="reasonForTransfer"
                    placeholder="Reason for Transfer"
                    value={formData.reasonForTransfer}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <select
                    name="priorityType"
                    value={formData.priorityType}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Priority Type</option>
                    <option value="MEDICAL">MEDICAL</option>
                    <option value="SPOUSE">SPOUSE</option>
                    <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                    <option value="GENERAL">GENERAL</option>
                </select>

                {renderPreferenceSection(1)}
                {renderPreferenceSection(2)}
                {renderPreferenceSection(3)}

                <input
                    name="createdBy"
                    placeholder="Created By"
                    value={formData.createdBy}
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
                    Submit Transfer Request
                </button>
            </div>
        </div>
    );
}

export default TransferRequestModule;