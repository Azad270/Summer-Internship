import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import API from "../api/api";

const UserContext = createContext();

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {

        try {

            const response = await API.get("/users/me");

            setUser(response.data.user);

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
                fetchUser,
                loading,
            }}

        >

            {children}

        </UserContext.Provider>

    );

}

export function useUser() {

    return useContext(UserContext);

}