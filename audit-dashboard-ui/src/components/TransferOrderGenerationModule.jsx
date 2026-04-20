import React, { useEffect, useState } from "react";

function TransferOrderGenerationModule() {
    const [transfers, setTransfers] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);

    useEffect(() => {
        fetchApprovedTransfers();
    }, []);

    const fetchApprovedTransfers = async () => {
        try {
            const response = await fetch("http://localhost:8080/transfers");
            const data = await response.json();

            const approvedOnly = data.filter(
                (item) => item.finalTransferStatus === "APPROVED"
            );

            setTransfers(approvedOnly);
        } catch (error) {
            console.error(error);
            alert("Failed to load approved transfers");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px"
    };

    const handlePrint = () => {
        window.print();
    };

    const printStyle = `
@media print {
    .no-print {
        display: none !important;
    }

    body {
        margin: 0;
        padding: 20px;
    }
}
`;

    return (

        <div style={{ padding: "30px", background: "#f8fafc", minHeight: "100vh" }}>
            <h1>Transfer Order Generation</h1>
            <p>Auto Generated Final Transfer Orders</p>

            <select
                style={inputStyle}
                onChange={(e) => {
                    const selected = transfers.find(
                        (item) => item.id === Number(e.target.value)
                    );
                    setSelectedTransfer(selected);
                }}
            >
                <option value="">Select Approved Employee</option>

                {transfers.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.employeeName} - {item.employeeId}
                    </option>
                ))}
            </select>

            {selectedTransfer && (
                <div
                    style={{
                        background: "white",
                        padding: "40px",
                        marginTop: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
                    }}
                >
                    <div style={{ textAlign: "right" }}>
                        Date: {selectedTransfer.effectiveDate}
                    </div>

                    <br />

                    <p>
                        To<br />
                        Sri/Smt. {selectedTransfer.employeeName}<br />
                        {selectedTransfer.designation}<br />
                        {selectedTransfer.currentBranch}
                    </p>

                    <br />

                    <p>
                        <strong>Sub:</strong> Transfer Order
                    </p>

                    <p>
                        <strong>Ref:</strong> Your Transfer Request Application No. TRF-{selectedTransfer.id}
                    </p>

                    <br />

                    <p>Dear Sir/Madam,</p>

                    <p>
                        With reference to your transfer request submitted on{" "}
                        <strong>{selectedTransfer.approvalGround}</strong> grounds,
                        your request has been considered and approved.
                    </p>

                    <p>
                        You are hereby transferred from:
                    </p>

                    <p>
                        <strong>
                            {selectedTransfer.currentRegion} → {selectedTransfer.currentBranch}
                        </strong>
                    </p>

                    <p>
                        to
                    </p>

                    <p>
                        <strong>
                            {selectedTransfer.approvedRegion} → {selectedTransfer.approvedBranch}
                        </strong>
                    </p>

                    <p>
                        with effect from <strong>{selectedTransfer.effectiveDate}</strong>.
                    </p>

                    <p>
                        You are advised to report to the new place of posting immediately.
                    </p>

                    <br /><br />

                    <p>
                        Yours Faithfully,
                    </p>

                    <p>
                        <strong>
                            General Manager<br />
                            -Sd-

                            <br /><br />

                            <button
                                onClick={handlePrint}
                                style={{
                                    padding: "10px 20px",
                                    background: "#2563eb",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                }}
                            >
                                Print Order
                            </button>

                            <button
                                onClick={() => window.print()}
                                style={{
                                    padding: "10px 20px",
                                    background: "#16a34a",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Download PDF
                            </button>

                            <button
                                className="no-print"
                                onClick={handlePrint}
                            >
                                Print Order
                            </button>
                        </strong>
                    </p>
                </div>
            )}
        </div>
    );
}

export default TransferOrderGenerationModule;