import React, { useEffect, useState } from "react";

function EmployeeListModule() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("http://3.6.88.154:8080/employees");
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load employees");
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await fetch(`http://3.6.88.154:8080/employees/${id}`, {
                method: "DELETE"
            });

            alert("Employee Deleted Successfully");
            fetchEmployees();
        } catch (error) {
            console.error(error);
            alert("Delete failed");
        }
    };

    const filteredEmployees = employees.filter((emp) =>
        (emp.employeeName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const inputStyle = {
        width: "350px",
        padding: "12px",
        marginBottom: "20px",
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
            <h1>Employee List</h1>
            <p>APGB HRMS Employee Records</p>

            <input
                type="text"
                placeholder="Search by Employee Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={inputStyle}
            />

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
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Designation</th>
                        <th>Scale</th>
                        <th>Posting Type</th>
                        <th>Region</th>
                        <th>Branch</th>
                        <th>HO Department</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredEmployees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.employeeId}</td>
                            <td>{emp.employeeName}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.scale}</td>
                            <td>{emp.postingType}</td>
                            <td>{emp.region || "-"}</td>
                            <td>{emp.branch || "-"}</td>
                            <td>{emp.hoDepartment || "-"}</td>

                            <td>
                                <button
                                    onClick={() => deleteEmployee(emp.id)}
                                    style={{
                                        padding: "8px 14px",
                                        border: "none",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        background: "#dc2626",
                                        color: "white"
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeListModule;