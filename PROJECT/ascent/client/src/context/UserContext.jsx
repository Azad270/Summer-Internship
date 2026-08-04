import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    // 1. Add state to hold the progression boundaries
    const [currentLevelBaseXp, setCurrentLevelBaseXp] = useState(0);
    const [nextLevelXp, setNextLevelXp] = useState(100);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await API.get("/users/me");
            setUser(response.data.user);
            // 2. Catch the boundaries sent by the server
            if (response.data.currentLevelBaseXp !== undefined) {
                setCurrentLevelBaseXp(response.data.currentLevelBaseXp);
            }
            if (response.data.nextLevelXp !== undefined) {
                setNextLevelXp(response.data.nextLevelXp);
            }
        } catch (error) {
            console.error("System Error: Failed to fetch user data.", error.response?.data || error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                currentLevelBaseXp, 
                setCurrentLevelBaseXp, 
                nextLevelXp,           
                setNextLevelXp,        
                fetchUser,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// You already created a custom hook here. Use it.
export function useUser() {
    return useContext(UserContext);
}