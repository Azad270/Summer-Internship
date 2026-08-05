import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../components/login/LoginForm";
import Background from "../components/common/Background";
import "../styles/global.css";
import "../styles/auth.css";
import { loginUser } from "../services/authService";
import SuccessModal from "../components/common/SuccessModal";
import API from "../api/api";
import { useUser } from "../context/UserContext";


function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { setUser } = useUser();

    const handleLogin = async (e, formData) => {

    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    try {

        const { email, password } = formData;

        const response = await API.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        setUser(response.data.user);

        navigate("/dashboard", {
            replace: true,
        });

    } catch (error) {

        setErrorMessage(
                error.response?.data?.message || "Authentication failed. Please try again."
            );

    } finally {

        setLoading(false);

    }

};

    return (
        <>
            <Background />

            <main className="auth-container">

                <section className="auth-card">
                    <LoginForm 
                        onSubmit={handleLogin} 
                        loading={loading} 
                        errorMessage={errorMessage}
                    />

                </section>

            </main>
        </>
    );

}

export default Login;