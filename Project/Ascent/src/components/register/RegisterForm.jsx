import { Link } from "react-router-dom";

function RegisterForm({ onSubmit }) {
    return (
        <>
            <h1 className="logo">ASCENT</h1>

            <p className="tagline">
                Create Your Account
            </p>

            <div className="divider"></div>

            <form onSubmit={onSubmit}>

                <div className="input-box">
                    <i className="fa-solid fa-user"></i>

                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                    />
                </div>

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
                    Create Account
                </button>

            </form>

            <p className="register-text">
                Already have an account?{" "}
                <Link to="/">
                    Login
                </Link>
            </p>
        </>
    );
}

export default RegisterForm;