import RegisterForm from "../components/register/RegisterForm";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/common/Background";
import SuccessModal from "../components/common/SuccessModal.jsx";

import "../styles/global.css";
import "../styles/auth.css";


function Register() {
    
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Background />
            
            <main className="auth-container">

                <section className="auth-card">

                    <RegisterForm
                        onSubmit={(e) => {
                            e.preventDefault();
                            setShowSuccess(true);
                        }}
                    />

                </section>

            </main>

            {
                showSuccess && (
                    <SuccessModal
                        message="Account Created Successfully!"
                        onClose={() => {
                            setShowSuccess(false);
                            navigate("/");
                        }}
                    />
                )
            }
        </>
    );
}

export default Register;