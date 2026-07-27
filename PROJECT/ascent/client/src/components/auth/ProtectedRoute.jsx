import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../../api/api";

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const verifyUser = async () => {

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

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;