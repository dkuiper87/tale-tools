import './App.css'

import { useAuth } from "./context/AuthContext.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/registration/Registration.jsx";
import Login from "./pages/login/Login.jsx";
import Account from "./pages/account/Account.jsx";
import Rules from "./pages/rules/Rules.jsx";
import Encounters from "./pages/encounters/Encounters.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import DiceRoller from "./components/diceRoller/DiceRoller.jsx";

function App() {
    const { user, status } = useAuth();
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const handleSidebarToggle = (isExpanded) => {
        setIsSidebarExpanded(isExpanded);
    };

    if (status === 'pending') {
        return <div>Loading...</div>;
    }

    return (
        <div className="app-container">
            {user && (
                <Sidebar onToggle={handleSidebarToggle} isExpanded={isSidebarExpanded} />
            )}
            <div className={`main-content ${isSidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/encounters" element={<Encounters />} />
                </Routes>
                {user && (
                    <DiceRoller/>
                )}
            </div>
        </div>
    );
}

export default App;
