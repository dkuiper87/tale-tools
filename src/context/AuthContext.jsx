import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import noviUri from "../constants/novibackend.jsx";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Login function
    const login = async (userData) => {
        try {
            const result = await axios.post(noviUri + 'api/auth/signin', userData);
            localStorage.setItem('token', result.data.accessToken);
            setUser(userData);
        } catch (error) {
            console.error("Error logging in to account:", error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        // Logic for logging out user
        localStorage.removeItem('token');
        localStorage.removeItem('accountID');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);