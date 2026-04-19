import React, { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                {
                    username: username,
                    password: password
                }
            );

            // Save JWT token
            localStorage.setItem("token", response.data);

            alert("Login Successful");

            // Move to dashboard
            onLogin();

        } catch (error) {
            alert("Invalid Username or Password");
            console.error(error);
        }
    };

    return (
        <div style={{
            width: "400px",
            margin: "100px auto",
            padding: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            <h2 style={{ textAlign: "center" }}>Audit Tracker Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={inputStyle}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
            />

            <button
                onClick={handleLogin}
                style={buttonStyle}
            >
                Login
            </button>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

export default Login;