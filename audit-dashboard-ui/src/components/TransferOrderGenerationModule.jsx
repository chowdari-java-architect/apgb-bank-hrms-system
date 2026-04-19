import React, { useEffect, useState } from "react";

function TransferOrderGenerationModule() {
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

    const generateOrder = async (id) => {
        const approvedRegion = prompt("Enter Approved Region:");
        const approvedBranch = prompt("Enter Approved Branch / HO Department:");
        const transferRemarks = prompt("Enter Transfer Remarks:");
        const effectiveTransferDate = prompt("Enter Effective Transfer Date (YYYY-MM-DD):");

        if (
            !approvedRegion ||
            !approvedBranch ||
            !effectiveTransferDate ||
            !transferRemarks
        ) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/transfers/generate-order/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        approvedRegion,
                        approvedBranch,
                        effectiveTransferDate,
                        transferRemarks
                    })
                }
            );

            if (response.ok) {
                alert("Transfer Order Generated Successfully");
                fetchTransfers();
            } else {
                alert("Order Generation Failed");
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
            <h1>Transfer Order Generation</h1>
            <p>Head Office Final Posting & Transfer Order Module</p>

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
                        <th>Employee</th>
                        <th>Final Status</th>
                        <th>GM Approval</th>
                        <th>Approved Posting</th>
                        <th>Order Status</th>
                        <th>Action</th>
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

                            <td>{item.finalTransferStatus}</td>

                            <td>{item.gmApproval}</td>

                            <td>
                                {item.approvedRegion || "-"}
                                <br />
                                {item.approvedBranch || "-"}
                            </td>

                            <td>{item.orderGeneratedStatus || "PENDING"}</td>
                            <td>
                                {item.gmApproval === "APPROVED" &&
                                item.orderGeneratedStatus !== "GENERATED" ? (
                                    <button
                                        onClick={() => generateOrder(item.id)}
                                        style={{
                                            padding: "8px 14px",
                                            background: "#2563eb",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Generate Order
                                    </button>
                                ) : (
                                    <>
                                        <span>Generated</span>
                                        <br />

                                        <button
                                            onClick={() =>
                                                window.open(
                                                    `http://localhost:8080/transfers/download-order/${item.id}`,
                                                    "_blank"
                                                )
                                            }
                                            style={{
                                                marginTop: "8px",
                                                padding: "8px 14px",
                                                background: "#16a34a",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Download PDF
                                        </button>
                                    </>
                                )}
                            </td>                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TransferOrderGenerationModule;