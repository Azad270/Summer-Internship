import { useNavigate } from "react-router-dom";
import Background from "../components/common/Background";
import "../styles/global.css";

function Landingpage() {
    const navigate = useNavigate();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", color: "white" }}>
            <Background />
            
            {/* Mock Premium Navbar */}
            <header style={{ 
                padding: "2rem 4rem", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderBottom: "1px solid rgba(0, 255, 255, 0.1)",
                backdropFilter: "blur(10px)"
            }}>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", color: "#00ffff" }}>
                    Ascent OS
                </div>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                    <button 
                        onClick={() => navigate("/login")}
                        style={{ background: "transparent", border: "1px solid #00ffff", color: "#00ffff", padding: "8px 20px" }}
                    >
                        Log In
                    </button>
                </div>
            </header>

            {/* Expansive Hero Section */}
            <main style={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                textAlign: "center",
                padding: "0 2rem"
            }}>
                <h1 style={{ 
                    fontSize: "5rem", 
                    textTransform: "uppercase", 
                    textShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
                    marginBottom: "1rem",
                    letterSpacing: "4px"
                }}>
                    Track. Rise. Repeat.
                </h1>
                
                <p style={{ 
                    fontSize: "1.4rem", 
                    color: "rgba(255, 255, 255, 0.7)", 
                    maxWidth: "800px",
                    lineHeight: "1.8",
                    marginBottom: "3rem"
                }}>
                    Initialize your system. Complete daily quests, accumulate XP, and elevate your rank in the ultimate gamified progression protocol.
                </p>

                <button 
                    onClick={() => navigate("/register")}
                    style={{ 
                        fontSize: "1.2rem", 
                        padding: "16px 40px", 
                        textTransform: "uppercase", 
                        letterSpacing: "1px",
                        boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)"
                    }}
                >
                    <i className="fa-solid fa-power-off" style={{ marginRight: "10px" }}></i> 
                    Initialize Protocol
                </button>
            </main>
        </div>
    );
}

export default Landingpage;