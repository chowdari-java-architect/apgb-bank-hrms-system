import React, { useEffect, useState } from "react";

function TransferApprovalDashboard() {
    const [transfers, setTransfers] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);
    const [vacancyStatus, setVacancyStatus] = useState("");

    useEffect(() => {
        fetchTransfers();
    }, []);

    const fetchTransfers = async () => {
        try {
            const response = await fetch("http://3.6.88.154:8080/transfers");
            const data = await response.json();
            setTransfers(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load transfer requests");
        }
    };

    const updateStatus = async (url, message) => {
        try {
            const response = await fetch(url, {
                method: "PUT"
            });

            if (response.ok) {
                alert(message);
                fetchTransfers();
                setSelectedTransfer(null);
            } else {
                alert("Action Failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    const checkVacancy = async (item) => {
        try {
            let response = await fetch(
                `http://3.6.88.154:8080/vacancies/check?region=${item.preference1Region}&branch=${item.preference1Branch}&scale=${item.scale}`
            );

            let result = await response.text();

            if (result === "VACANCY_AVAILABLE") {
                setVacancyStatus(
                    `Preference 1 Selected → ${item.preference1Region} - ${item.preference1Branch} ✅`
                );
                return;
            }

            response = await fetch(
                `http://3.6.88.154:8080/vacancies/check?region=${item.preference2Region}&branch=${item.preference2Branch}&scale=${item.scale}`
            );

            result = await response.text();

            if (result === "VACANCY_AVAILABLE") {
                setVacancyStatus(
                    `Preference 2 Selected → ${item.preference2Region} - ${item.preference2Branch} ✅`
                );
                return;
            }

            response = await fetch(
                `http://3.6.88.154:8080/vacancies/check?region=${item.preference3Region}&branch=${item.preference3Branch}&scale=${item.scale}`
            );

            result = await response.text();

            if (result === "VACANCY_AVAILABLE") {
                setVacancyStatus(
                    `Preference 3 Selected → ${item.preference3Region} - ${item.preference3Branch} ✅`
                );
                return;
            }

            setVacancyStatus("No Vacancy Available in All 3 Preferences ❌");

        } catch (error) {
            console.error(error);
            setVacancyStatus("Vacancy Check Failed");
        }
    };

    const rejectTransfer = async (id) => {
        const reason = prompt("Enter rejection reason:");

        if (!reason) {
            alert("Rejection reason is required");
            return;
        }

        try {
            const response = await fetch(
                `http://3.6.88.154:8080/transfers/reject/${id}?reason=${encodeURIComponent(reason)}`,
                {
                    method: "PUT"
                }
            );

            if (response.ok) {
                alert("Transfer Rejected");
                fetchTransfers();
                setSelectedTransfer(null);
            } else {
                alert("Rejection Failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    return (
        <div>
            {/* Remaining UI stays same */}
        </div>
    );
}

export default TransferApprovalDashboard;