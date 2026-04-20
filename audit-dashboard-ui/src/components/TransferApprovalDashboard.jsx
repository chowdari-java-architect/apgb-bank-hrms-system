import React, { useEffect, useState } from "react";

function TransferApprovalDashboard() {
    const [transfers, setTransfers] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);

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

    const rejectTransfer = async (id) => {
        const reason = prompt("Enter rejection reason:");

        if (!reason) {
            alert("Rejection reason is required");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/transfers/reject/${id}?reason=${encodeURIComponent(reason)}`,
                {
                    method: "PUT"
                }
            );

            if (response.ok) {
                alert("Transfer Rejected");
                fetchTransfers();
            } else {
                alert("Rejection Failed");
            }
        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };

    return (
        <div
            style={{
                padding: "30px",
                background: "#f8fafc",
                minHeight: "100vh"
            }}
        >
            <h1>Head Office Transfer Approval Dashboard</h1>
            <p>Full Review + Approval Workflow</p>

            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    overflowX: "auto"
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Details</th>
                        <th>Current Posting</th>
                        <th>Reason</th>
                        <th>Priority</th>
                        <th>Preference 1</th>
                        <th>Preference 2</th>
                        <th>Preference 3</th>
                        <th>Current Stage</th>
                        <th>Final Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {transfers.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>

                            <td>
                                <strong>{item.employeeName}</strong>
                                <br />
                                ID: {item.employeeId}
                                <br />
                                {item.designation}
                                <br />
                                Scale: {item.scale}
                            </td>

                            <td>
                                {item.currentRegion}
                                <br />
                                {item.currentBranch || item.currentHoDepartment}
                            </td>

                            <td>{item.reasonForTransfer}</td>

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

                            <td>{item.currentApprovalStage}</td>

                            <td>{item.finalTransferStatus}</td>
                            <td>
                                <button
                                    onClick={() => setSelectedTransfer(item)}
                                    style={{
                                        padding: "8px 14px",
                                        background: "#2563eb",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Review File
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {selectedTransfer && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            width: "700px",
                            borderRadius: "12px"
                        }}
                    >
                        <h2>Transfer Review</h2>

                        <p><b>Name:</b> {selectedTransfer.employeeName}</p>
                        <p><b>ID:</b> {selectedTransfer.employeeId}</p>
                        <p><b>Designation:</b> {selectedTransfer.designation}</p>

                        <hr />

                        <p><b>Current:</b> {selectedTransfer.currentRegion} - {selectedTransfer.currentBranch}</p>

                        <hr />

                        <p><b>Preference 1:</b> {selectedTransfer.preference1Region} - {selectedTransfer.preference1Branch}</p>
                        <p><b>Preference 2:</b> {selectedTransfer.preference2Region} - {selectedTransfer.preference2Branch}</p>
                        <p><b>Preference 3:</b> {selectedTransfer.preference3Region} - {selectedTransfer.preference3Branch}</p>

                        <hr />

                        <p><b>Status:</b> {selectedTransfer.finalTransferStatus}</p>

                        <br />

                        {selectedTransfer.currentApprovalStage === "HR_VERIFICATION" && (
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://localhost:8080/transfers/forward-to-sm/${selectedTransfer.id}`,
                                        "Forwarded to Senior Manager"
                                    )
                                }
                            >
                                Forward to SM
                            </button>
                        )}

                        {selectedTransfer.currentApprovalStage === "SENIOR_MANAGER" && (
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://localhost:8080/transfers/forward-to-agm/${selectedTransfer.id}`,
                                        "Forwarded to AGM"
                                    )
                                }
                                style={{ marginLeft: "10px" }}
                            >
                                Forward to AGM
                            </button>
                        )}

                        {selectedTransfer.currentApprovalStage === "AGM" && (
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://localhost:8080/transfers/forward-to-gm/${selectedTransfer.id}`,
                                        "Forwarded to GM"
                                    )
                                }
                                style={{ marginLeft: "10px" }}
                            >
                                Forward to GM
                            </button>
                        )}

                        {selectedTransfer.currentApprovalStage === "GM" && (
                            <button
                                onClick={() =>
                                    updateStatus(
                                        `http://localhost:8080/transfers/gm-approve/${selectedTransfer.id}`,
                                        "Final Approval Completed"
                                    )
                                }
                                style={{ marginLeft: "10px" }}
                            >
                                Final Approve
                            </button>
                        )}

                        <button
                            onClick={() => rejectTransfer(selectedTransfer.id)}
                            style={{
                                marginLeft: "10px",
                                background: "#dc2626",
                                color: "white",
                                border: "none",
                                padding: "10px"
                            }}
                        >
                            Reject
                        </button>

                        <br /><br />

                        <button
                            onClick={() => setSelectedTransfer(null)}
                            style={{
                                padding: "10px",
                                background: "red",
                                color: "white",
                                border: "none"
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default TransferApprovalDashboard;