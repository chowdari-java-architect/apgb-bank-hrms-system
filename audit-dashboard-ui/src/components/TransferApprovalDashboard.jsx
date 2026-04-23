/* eslint-disable no-unused-vars */
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
                setVacancyStatus("");
            } else {
                alert("Action Failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
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

    return (
        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h1>HO Transfer Approval Dashboard</h1>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    background: "white",
                    borderCollapse: "collapse",
                    marginTop: "20px"
                }}
            >
                <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Current Region</th>
                    <th>Current Stage</th>
                    <th>Final Status</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {transfers.map((item) => (
                    <tr key={item.id}>
                        <td>{item.employeeId}</td>
                        <td>{item.employeeName}</td>
                        <td>{item.currentRegion}</td>
                        <td>{item.currentApprovalStage}</td>
                        <td>{item.finalTransferStatus}</td>

                        <td>
                            <button onClick={() => setSelectedTransfer(item)}>
                                Review
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedTransfer && (
                <div
                    style={{
                        position: "fixed",
                        top: "5%",
                        left: "15%",
                        width: "70%",
                        background: "white",
                        padding: "30px",
                        border: "2px solid #333",
                        zIndex: 999,
                        maxHeight: "85vh",
                        overflowY: "auto",
                        boxShadow: "0px 0px 20px rgba(0,0,0,0.3)"
                    }}
                >
                    <h2>Transfer Request Review</h2>

                    <p><b>Employee ID:</b> {selectedTransfer.employeeId}</p>
                    <p><b>Employee Name:</b> {selectedTransfer.employeeName}</p>
                    <p><b>Designation:</b> {selectedTransfer.designation}</p>
                    <p><b>Scale:</b> {selectedTransfer.scale}</p>

                    <p><b>Current Region:</b> {selectedTransfer.currentRegion}</p>
                    <p><b>Current Branch:</b> {selectedTransfer.currentBranch}</p>

                    <p><b>Preference 1:</b> {selectedTransfer.preference1Region} - {selectedTransfer.preference1Branch}</p>
                    <p><b>Preference 2:</b> {selectedTransfer.preference2Region} - {selectedTransfer.preference2Branch}</p>
                    <p><b>Preference 3:</b> {selectedTransfer.preference3Region} - {selectedTransfer.preference3Branch}</p>

                    <p><b>Priority Type:</b> {selectedTransfer.priorityType}</p>
                    <p><b>Approval Ground:</b> {selectedTransfer.approvalGround}</p>

                    <p><b>HR Status:</b> {selectedTransfer.hrVerificationStatus}</p>
                    <p><b>Senior Manager:</b> {selectedTransfer.seniorManagerApproval}</p>
                    <p><b>AGM:</b> {selectedTransfer.agmApproval}</p>
                    <p><b>GM:</b> {selectedTransfer.gmApproval}</p>

                    <p><b>Current Stage:</b> {selectedTransfer.currentApprovalStage}</p>
                    <p><b>Final Status:</b> {selectedTransfer.finalTransferStatus}</p>
                    <p><b>Reviewed By:</b> {selectedTransfer.reviewedBy}</p>

                    <hr />

                    {/* HR */}
                    {selectedTransfer.currentApprovalStage === "HR_VERIFICATION" && (
                        <>
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://3.6.88.154:8080/transfers/forward-to-sm/${selectedTransfer.id}`,
                                        "Forwarded to Senior Manager"
                                    )
                                }
                            >
                                Forward to SM
                            </button>
                        </>
                    )}

                    {/* Senior Manager */}
                    {selectedTransfer.currentApprovalStage === "SENIOR_MANAGER" && (
                        <>
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://3.6.88.154:8080/transfers/forward-to-agm/${selectedTransfer.id}`,
                                        "Forwarded to AGM"
                                    )
                                }
                            >
                                Forward to AGM
                            </button>
                        </>
                    )}

                    {/* AGM */}
                    {selectedTransfer.currentApprovalStage === "AGM" && (
                        <>
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://3.6.88.154:8080/transfers/forward-to-gm/${selectedTransfer.id}`,
                                        "Forwarded to GM"
                                    )
                                }
                            >
                                Forward to GM
                            </button>
                        </>
                    )}

                    {/* GM */}
                    {selectedTransfer.currentApprovalStage === "GM" && (
                        <>
                            <button
                                onClick={() => checkVacancy(selectedTransfer)}
                            >
                                Check Vacancy
                            </button>

                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://3.6.88.154:8080/transfers/gm-approve/${selectedTransfer.id}`,
                                        "Final Transfer Approved"
                                    )
                                }
                                style={{ marginLeft: "10px" }}
                            >
                                Final Approve
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => rejectTransfer(selectedTransfer.id)}
                        style={{ marginLeft: "10px" }}
                    >
                        Reject
                    </button>

                    <button
                        onClick={() => {
                            setSelectedTransfer(null);
                            setVacancyStatus("");
                        }}
                        style={{ marginLeft: "10px" }}
                    >
                        Close
                    </button>

                    {vacancyStatus && (
                        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                            {vacancyStatus}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TransferApprovalDashboard;