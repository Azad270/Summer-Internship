import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaMagnifyingGlass, FaUserAstronaut } from "react-icons/fa6";
import { useUser } from "../../context/UserContext"; 

function Topbar() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/habits?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(""); 
        }
    };

    return (
        <header className="topbar">
            
            <div className="search-box">
                <FaMagnifyingGlass style={{ color: "var(--text-secondary)" }} />
                <input
                    type="text"
                    placeholder="Search system protocols..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch} 
                />
            </div>

            <div className="topbar-right">
                
                <button className="notification-btn">
                    <FaBell />
                </button>

                <div className="profile-box">
                    <div className="profile-avatar" style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "50%", 
                        overflow: "hidden", 
                        background: "rgba(0, 217, 255, 0.1)", 
                        border: "1px solid var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {user?.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt="Operative" 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                onError={(e) => { e.target.style.display='none'; }} // Failsafe if URL is broken
                            />
                        ) : (
                            <FaUserAstronaut size={20} color="var(--primary)" />
                        )}
                    </div>

                    <div>
                        <h4 style={{ fontFamily: "var(--font-heading)", letterSpacing: "1px" }}>{user?.username || "Ascender"}</h4>
                        <p style={{ color: "var(--primary)" }}>Rank {user?.rank || "E"}</p>
                    </div>
                </div>

            </div>
            
        </header>
    );
}

export default Topbar;