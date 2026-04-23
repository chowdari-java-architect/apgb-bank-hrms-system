/* eslint-disable no-unused-vars */
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
            const response = await fetch("http://3.6.88.154:8080/vacancies");
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
            const response = await fetch("http://3.6.88.154:8080/vacancies", {
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

    return (
        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h2>Vacancy Management Module</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
                marginBottom: "20px"
            }}>

                <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                >
                    <option value="">Select Region</option>
                    {regionOptions.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="branchOrDepartment"
                    value={formData.branchOrDepartment}
                    onChange={handleChange}
                >
                    <option value="">Select Branch / Department</option>
                    {(branchOptions[formData.region] || []).map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                >
                    <option value="">Select Designation</option>
                    {designationOptions.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    name="scale"
                    value={formData.scale}
                    onChange={handleChange}
                >
                    <option value="">Select Scale</option>
                    {scaleOptions.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="sanctionedStrength"
                    placeholder="Sanctioned Strength"
                    value={formData.sanctionedStrength}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="workingStrength"
                    placeholder="Working Strength"
                    value={formData.workingStrength}
                    onChange={handleChange}
                />
            </div>

            <button onClick={handleSubmit}>
                Save Vacancy
            </button>

            <hr style={{ margin: "30px 0" }} />

            <h3>Vacancy List</h3>

            <table border="1" cellPadding="10" style={{ width: "100%" }}>
                <thead>
                <tr>
                    <th>Region</th>
                    <th>Branch</th>
                    <th>Designation</th>
                    <th>Scale</th>
                    <th>Sanctioned</th>
                    <th>Working</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {vacancies.map((item) => (
                    <tr key={item.id}>
                        <td>{item.region}</td>
                        <td>{item.branchOrDepartment}</td>
                        <td>{item.designation}</td>
                        <td>{item.scale}</td>
                        <td>{item.sanctionedStrength}</td>
                        <td>{item.workingStrength}</td>
                        <td>{item.vacancyStatus}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default VacancyManagementModule;