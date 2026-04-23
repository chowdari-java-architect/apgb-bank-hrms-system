import React, { useState } from "react";

function TransferRequestModule() {
    const regionOptions = [
        "Head Office",
        "Srikakulam RO",
        "Vizianagaram RO",
        "Visakhapatnam RO",
        "Kakinada RO",
        "Rajahmundry RO",
        "Eluru RO",
        "Vijayawada RO",
        "Guntur RO",
        "Ongole RO",
        "Nellore RO",
        "Tirupati RO",
        "Kadapa RO",
        "Kurnool RO",
        "Anantapur RO",
        "Chittoor RO"
    ];

    const branchOptions = {
        "Head Office": [
            "HR Department",
            "IT Department",
            "Accounts Department",
            "Inspection Department"
        ],
        "Srikakulam RO": [
            "Srikakulam Main",
            "Palasa",
            "Tekkali",
            "Narasannapeta"
        ],
        "Vizianagaram RO": [
            "Vizianagaram Main",
            "Gajapathinagaram",
            "Bobbili",
            "Cheepurupalli"
        ],
        "Visakhapatnam RO": [
            "MVP Colony",
            "Gajuwaka",
            "Anakapalle",
            "Madhurawada"
        ],
        "Guntur RO": [
            "Guntur Main",
            "Mangalagiri",
            "Tenali",
            "Sattenapalli"
        ]
    };

    const designationOptions = [
        "Clerk",
        "Senior Assistant",
        "Officer",
        "Manager",
        "Senior Manager",
        "AGM",
        "GM"
    ];

    const scaleOptions = [
        "Scale I",
        "Scale II",
        "Scale III",
        "Scale IV",
        "Scale V"
    ];

    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        designation: "",
        scale: "",
        currentRegion: "",
        currentBranch: "",
        reasonForTransfer: "",
        priorityType: "",
        preference1Region: "",
        preference1Branch: "",
        preference2Region: "",
        preference2Branch: "",
        preference3Region: "",
        preference3Branch: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://3.6.88.154:8080/transfers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Transfer Request Submitted Successfully");
            } else {
                alert("Submission Failed");
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
            <h1>Transfer Request Module</h1>
            <p>Employee Transfer Portal</p>

            <div style={{
                background: "white",
                padding: "30px",
                borderRadius: "12px",
                maxWidth: "900px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>

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

                <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Designation</option>
                    {designationOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="scale"
                    value={formData.scale}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Scale</option>
                    {scaleOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="currentRegion"
                    value={formData.currentRegion}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Current Region</option>
                    {regionOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="currentBranch"
                    value={formData.currentBranch}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Current Branch</option>
                    {(branchOptions[formData.currentRegion] || []).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="priorityType"
                    value={formData.priorityType}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Priority Type</option>
                    <option>Medical</option>
                    <option>Spouse</option>
                    <option>Administrative</option>
                    <option>General</option>
                </select>

                <select
                    name="preference1Region"
                    value={formData.preference1Region}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 1 Region</option>
                    {regionOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="preference1Branch"
                    value={formData.preference1Branch}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 1 Branch</option>
                    {(branchOptions[formData.preference1Region] || []).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="preference2Region"
                    value={formData.preference2Region}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 2 Region</option>
                    {regionOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="preference2Branch"
                    value={formData.preference2Branch}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 2 Branch</option>
                    {(branchOptions[formData.preference2Region] || []).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="preference3Region"
                    value={formData.preference3Region}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 3 Region</option>
                    {regionOptions.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>

                <select
                    name="preference3Branch"
                    value={formData.preference3Branch}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Preference 3 Branch</option>
                    {(branchOptions[formData.preference3Region] || []).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <input
                    name="reasonForTransfer"
                    placeholder="Reason For Transfer"
                    value={formData.reasonForTransfer}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    onClick={handleSubmit}
                    style={{
                        width: "100%",
                        padding: "14px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
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