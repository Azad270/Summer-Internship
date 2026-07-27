import RegisterForm from "../components/register/RegisterForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/common/Background";
import SuccessModal from "../components/common/SuccessModal.jsx";

import "../styles/global.css";
import "../styles/auth.css";
import { registerUser } from "../services/authService";
import API from "../api/api";

function Register() {

    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };    
    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const { username, email, password } = formData;

            await API.post("/auth/register", {

                username,
                email,
                password,

            });

            setShowSuccess(true);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
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

                    <RegisterForm
                        onSubmit={handleRegister}
                        formData={formData}
                        onChange={handleChange}
                    />

                </section>

            </main>

            {

                showSuccess && (

                    <SuccessModal

                        message="Account Created Successfully!"

                        onClose={() => {

                            setShowSuccess(false);

                            navigate("/", {
                                replace: true,
                            });

                        }}

                    />

                )

            }

        </>

    );

}

export default Register;