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
        <div>
            {/* UI remains same */}
        </div>
    );
}

export default VacancyManagementModule;