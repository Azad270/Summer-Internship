import { Link } from "react-router-dom";
import { useState } from "react";

// 1. Destructure the loading prop
function LoginForm({ onSubmit, loading }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <>
            <h1 className="logo">ASCENT</h1>

            <p className="tagline">
                Track. Rise. Repeat.
            </p>

            <div className="divider"></div>

            <h2>SYSTEM AUTHORIZATION</h2>

            <form
                onSubmit={(e) =>
                    onSubmit(e, {
                        email,
                        password,
                    })
                }
            >
                <div className="input-box">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-box">
                    <i className="fa-solid fa-lock"></i>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* 2. Bind the disabled attribute and conditionally render content */}
                <button type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin"></i> Authenticating...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-arrow-right"></i> Enter System
                        </>
                    )}
                </button>
            </form>

            <p className="register-text">
                New to ASCENT?{" "}
                <Link to="/register">
                    Create Account
                </Link>
            </p>
        </>
    );
}

export default LoginForm;