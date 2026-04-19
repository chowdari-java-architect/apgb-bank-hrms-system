import React, { useEffect, useState } from "react";

function TransferApprovalDashboard() {
    const [transfers, setTransfers] = useState([]);

    useEffect(() => {
        fetchTransfers();
    }, []);

    const fetchTransfers = async () => {
        try {
            const response = await fetch("http://localhost:8080/transfers");
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
            } else {
                alert("Action Failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    return (
        <div style={{
            padding: "30px",
            background: "#f8fafc",
            minHeight: "100vh"
        }}>
            <h1>Head Office Transfer Approval Dashboard</h1>
            <p>APGB Enterprise HO Approval Workflow</p>

            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                overflowX: "auto"
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Current Posting</th>
                        <th>Priority</th>
                        <th>Preference 1</th>
                        <th>Preference 2</th>
                        <th>Preference 3</th>
                        <th>HR Verify</th>
                        <th>SM Approval</th>
                        <th>AGM Approval</th>
                        <th>GM Approval</th>
                        <th>Final Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {transfers.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>

                            <td>
                                {item.employeeName}
                                <br />
                                ({item.employeeId})
                            </td>

                            <td>
                                {item.currentRegion}
                                <br />
                                {item.currentBranch || item.currentHoDepartment}
                            </td>

                            <td>{item.priorityType}</td>

                            <td>
                                {item.preference1Region}
                                <br />
                                {item.preference1Branch}
                            </td>

                            <td>
                                {item.preference2Region}
                                <br />
                                {item.preference2Branch}
                            </td>

                            <td>
                                {item.preference3Region}
                                <br />
                                {item.preference3Branch}
                            </td>

                            <td>
                                {item.hrVerificationStatus === "VERIFIED" ? (
                                    "VERIFIED"
                                ) : (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                `http://localhost:8080/transfers/verify/${item.id}`,
                                                "HR Verification Completed"
                                            )
                                        }
                                    >
                                        Verify
                                    </button>
                                )}
                            </td>

                            <td>
                                {item.seniorManagerApproval === "APPROVED" ? (
                                    "APPROVED"
                                ) : (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                `http://localhost:8080/transfers/senior-manager-approve/${item.id}`,
                                                "Senior Manager Approved"
                                            )
                                        }
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>

                            <td>
                                {item.agmApproval === "APPROVED" ? (
                                    "APPROVED"
                                ) : (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                `http://localhost:8080/transfers/agm-approve/${item.id}`,
                                                "AGM Approved"
                                            )
                                        }
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>

                            <td>
                                {item.gmApproval === "APPROVED" ? (
                                    "APPROVED"
                                ) : (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                `http://localhost:8080/transfers/gm-approve/${item.id}`,
                                                "GM Final Approval Completed"
                                            )
                                        }
                                    >
                                        Final Approve
                                    </button>
                                )}
                            </td>

                            <td>{item.finalTransferStatus}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransferApprovalDashboard;