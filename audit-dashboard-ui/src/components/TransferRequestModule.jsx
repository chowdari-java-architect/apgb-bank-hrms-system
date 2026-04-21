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

        if (
            name === "currentRegion" ||
            name === "preference1Region" ||
            name === "preference2Region" ||
            name === "preference3Region"
        ) {
            setFormData({
                ...formData,
                [name]: value,
                ...(name === "currentRegion" && { currentBranch: "" }),
                ...(name === "preference1Region" && { preference1Branch: "" }),
                ...(name === "preference2Region" && { preference2Branch: "" }),
                ...(name === "preference3Region" && { preference3Branch: "" })
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
            const response = await fetch("http://3.6.88.154:8080/transfers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Transfer Request Submitted Successfully");

                setFormData({
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
        <div
            style={{
                padding: "30px",
                background: "#f8fafc",
                minHeight: "100vh"
            }}
        >
            <h1>Transfer Request Module</h1>
            <p>Employee Transfer Portal</p>

            <div
                style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    maxWidth: "800px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                }}
            >
                {/* Remaining UI code stays same */}
            </div>
        </div>
    );
}

export default TransferRequestModule;