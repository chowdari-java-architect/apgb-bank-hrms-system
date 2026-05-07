import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import CombinedHRMSApp from "./components/CombinedHRMSApp";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <CombinedHRMSApp onLogout={handleLogout} />
            ) : (
                <Login onLogin={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
