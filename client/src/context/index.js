import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../commonapi/index";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch user details on page load
    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const token = localStorage.getItem("authToken"); // ✅ Get token from localStorage
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const response = await fetch(SummaryApi.getUser.url, {
                method: SummaryApi.getUser.method,
                headers: {
                    "Authorization": `Bearer ${token}`, // ✅ Send token in headers
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log("User Details:", data);

            if (data.success) {
                setUser(data.user);
            } else {
                setUser(null);
                localStorage.removeItem("authToken"); // ✅ Remove invalid token
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken"); // ✅ Clear token from localStorage
        setUser(null);
        navigate("/login"); // ✅ Redirect to login page after logout
    };

    return (
        <Context.Provider value={{ user, fetchUserDetails, logout }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
