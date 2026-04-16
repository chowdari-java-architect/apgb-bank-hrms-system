function loadEmployees() {
    fetch("/employees")
        .then(response => response.json())
        .then(data => {
            let rows = "";
            data.forEach(emp => {
                rows += "<tr>"
                    + "<td>" + emp.id + "</td>"
                    + "<td>" + emp.name + "</td>"
                    + "<td>" + emp.email + "</td>"
                    + "<td>" + emp.role + "</td>"
                    + "</tr>";
            });
            document.querySelector("#employeeTable tbody").innerHTML = rows;
        });
}

function loadTransfers() {
    fetch("/transfers")
        .then(response => response.json())
        .then(data => {
            let rows = "";
            data.forEach(req => {
                rows += "<tr>"
                    + "<td>" + req.id + "</td>"
                    + "<td>" + req.employeeName + "</td>"
                    + "<td>" + req.currentRole + "</td>"
                    + "<td>" + req.requestedRole + "</td>"
                    + "<td>" + req.status + "</td>"
                    + "<td><button data-approve='true' onclick='approveTransfer(" + req.id + ")'>Approve</button></td>"
                    + "</tr>";
            });

            document.querySelector("#transferTable tbody").innerHTML = rows;
            applyRoleAccess();
        });
}

function loadAnalytics() {
    fetch("/employees")
        .then(res => res.json())
        .then(empData => {
            document.getElementById("totalEmployees").innerText = empData.length;
        });

    fetch("/transfers")
        .then(res => res.json())
        .then(data => {
            let pending = data.filter(r => r.status === "PENDING").length;
            let approved = data.filter(r => r.status === "APPROVED").length;

            document.getElementById("pendingRequests").innerText = pending;
            document.getElementById("approvedRequests").innerText = approved;
        });
}

function applyRoleAccess() {
    let role = document.getElementById("loginRole").value;
    let approveButtons = document.querySelectorAll("button[data-approve='true']");

    approveButtons.forEach(btn => {
        btn.style.display = role === "HR" ? "inline-block" : "none";
    });
}

function approveTransfer(id) {
    fetch("/transfers/" + id + "/approve", {
        method: "PUT"
    }).then(() => {
        alert("Transfer Approved");
        loadTransfers();
        loadEmployees();
        loadAnalytics();
    });
}

document.getElementById("employeeForm").addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            role: document.getElementById("role").value,
            joiningDate: document.getElementById("joiningDate").value
        })
    }).then(() => {
        alert("Employee Saved Successfully");
        loadEmployees();
        loadAnalytics();
        document.getElementById("employeeForm").reset();
    });
});

document.getElementById("transferForm").addEventListener("submit", function(e) {
    e.preventDefault();

    fetch("/transfers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            employeeName: document.getElementById("employeeName").value,
            currentRole: document.getElementById("currentRole").value,
            requestedRole: document.getElementById("requestedRole").value,
            reason: document.getElementById("reason").value
        })
    }).then(() => {
        alert("Transfer Request Submitted");
        loadTransfers();
        loadAnalytics();
        document.getElementById("transferForm").reset();
    });
});

loadEmployees();
loadTransfers();
loadAnalytics();