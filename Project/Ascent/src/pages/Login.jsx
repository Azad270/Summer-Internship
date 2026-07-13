import { useNavigate } from "react-router-dom";

import LoginForm from "../components/login/LoginForm";
import Background from "../components/common/Background";
import "../styles/global.css";
import "../styles/auth.css";



function Login() {
    const navigate = useNavigate();

    return (
        <>
            <Background />

            
            <main className="auth-container">
                <section className="auth-card">

                    <LoginForm
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate("/dashboard");
                        }}
                    />

                </section>
                
            </main>
        </>
    );
}

export default Login;