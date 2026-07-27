import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../../api/api";

function PublicRoute({ children }) {

    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem("token");
    const [authenticated, setAuthenticated] = useState(!!token);

    useEffect(() => {

        const verifyUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                await API.get("/auth/verify");

                setAuthenticated(true);

            } catch (error) {

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };

        verifyUser();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (authenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;