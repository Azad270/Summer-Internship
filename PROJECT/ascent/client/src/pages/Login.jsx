import { useNavigate } from "react-router-dom";
import LoginForm from "../components/login/LoginForm";
import Background from "../components/common/Background";
import "../styles/global.css";
import "../styles/auth.css";
import { loginUser } from "../services/authService";
import { useState } from "react";
import SuccessModal from "../components/common/SuccessModal";
import API from "../api/api";


function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e, formData) => {

    e.preventDefault();

    setLoading(true);

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

        navigate("/dashboard", {
            replace: true,
        });

    } catch (error) {

        alert(
            error.response?.data?.message ||
            "Login Failed"
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
                    />

                </section>

            </main>
        </>
    );

}

export default Login;