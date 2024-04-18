import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import noviUri from "../constants/novibackend.jsx";

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('pending');

    // Check if a token exists.
    // If it does, fetch user data from the server and set status to 'done'.
    // If it doesn't, set status to 'done'.

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            axios.get(noviUri + 'api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUser(response.data);
                    setStatus('done');
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setStatus('done');
                });
        } else {
            setStatus('done');
        }
    }, []);

    // Login function
    const login = async (userData) => {
        try {
            const result = await axios.post(noviUri + 'api/auth/signin', userData);
            localStorage.setItem('token', result.data.accessToken);
            setUser(result.data);
            return result;
        } catch (error) {
            console.error("Error logging in to account:", error);
            throw error;
        }
    };

    // Logout function
    const logout = () => {
        // Logic for logging out user
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, status }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to access the auth context
export const useAuth = () => useContext(AuthContext);