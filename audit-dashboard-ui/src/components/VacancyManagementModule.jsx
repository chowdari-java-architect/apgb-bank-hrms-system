import React, { useState, useEffect } from "react";
function VacancyManagementModule() {
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
            "Inspection Department",
            "Recovery Department"
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
        region: "",
        branchOrDepartment: "",
        designation: "",
        scale: "",
        sanctionedStrength: "",
        workingStrength: "",
        vacancyStatus: "ACTIVE"
    });

    const [vacancies, setVacancies] = useState([]);


    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const response = await fetch("http://localhost:8080/vacancies");
            const data = await response.json();
            setVacancies(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "region") {
            setFormData({
                ...formData,
                region: value,
                branchOrDepartment: ""
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/vacancies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Vacancy Saved Successfully");
                fetchVacancies();

                setFormData({
                    region: "",
                    branchOrDepartment: "",
                    designation: "",
                    scale: "",
                    sanctionedStrength: "",
                    workingStrength: "",
                    vacancyStatus: "ACTIVE"
                });
            } else {
                alert("Failed to Save Vacancy");
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
        <div
            style={{
                padding: "30px",
                background: "#f8fafc",
                minHeight: "100vh"
            }}
        >
            <h1>Vacancy Management Module</h1>
            <p>Head Office Vacancy Master Entry</p>

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    maxWidth: "700px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                }}
            >
                {/* Region Dropdown */}
                <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Region / Head Office</option>
                    {regionOptions.map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>

                {/* Branch Dropdown */}
                <select
                    name="branchOrDepartment"
                    value={formData.branchOrDepartment}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Branch / Department</option>
                    {(branchOptions[formData.region] || []).map((branch, index) => (
                        <option key={index} value={branch}>
                            {branch}
                        </option>
                    ))}
                </select>

                {/* Designation Dropdown */}
                <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Designation</option>
                    {designationOptions.map((designation, index) => (
                        <option key={index} value={designation}>
                            {designation}
                        </option>
                    ))}
                </select>

                {/* Scale Dropdown */}
                <select
                    name="scale"
                    value={formData.scale}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="">Select Scale</option>
                    {scaleOptions.map((scale, index) => (
                        <option key={index} value={scale}>
                            {scale}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="sanctionedStrength"
                    placeholder="Sanctioned Strength"
                    value={formData.sanctionedStrength}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="workingStrength"
                    placeholder="Working Strength"
                    value={formData.workingStrength}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    onClick={handleSubmit}
                    style={buttonStyle}
                >
                    Save Vacancy
                </button>

                <div
                    style={{
                        marginTop: "30px",
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                    }}
                >
                    <h2>Vacancy Position List</h2>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Region</th>
                            <th>Branch / Dept</th>
                            <th>Designation</th>
                            <th>Scale</th>
                            <th>Sanctioned</th>
                            <th>Working</th>
                            <th>Vacant</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        {vacancies.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.region}</td>
                                <td>{item.branchOrDepartment}</td>
                                <td>{item.designation}</td>
                                <td>{item.scale}</td>
                                <td>{item.sanctionedStrength}</td>
                                <td>{item.workingStrength}</td>
                                <td>{item.vacantPositions}</td>
                                <td>{item.vacancyStatus}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VacancyManagementModule;