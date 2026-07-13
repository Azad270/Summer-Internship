import { Link } from "react-router-dom";

function LoginForm({ onSubmit }) {
    return (
        <>
            <h1 className="logo">ASCENT</h1>

            <p className="tagline">
                Track. Rise. Repeat.
            </p>

            <div className="divider"></div>

            <h2>SYSTEM AUTHORIZATION</h2>

            <form onSubmit={onSubmit}>

                <div className="input-box">
                    <i className="fa-solid fa-envelope"></i>

                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                </div>

                <div className="input-box">
                    <i className="fa-solid fa-lock"></i>

                    <input
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>

                <button type="submit">
                    <i className="fa-solid fa-arrow-right"></i>
                    {" "}Enter System
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