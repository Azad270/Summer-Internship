import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaMagnifyingGlass, FaUserAstronaut, FaBars } from "react-icons/fa6"; 
import { useUser } from "../../context/UserContext"; 

function Topbar({ toggleSidebar }) { 
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
            
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <button 
                    className="mobile-menu-btn" 
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                    style={{ background: "transparent", border: "none", color: "var(--primary)", fontSize: "24px", cursor: "pointer" }}
                >
                    <FaBars />
                </button>

                {/* The Mobile Logo restored */}
                <div className="mobile-logo" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: "700", letterSpacing: "2px" }}>
                    ASCENT OS
                </div>

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
            </div>

            <div className="topbar-right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                
                <button className="notification-btn" style={{ background: "transparent", border: "none", color: "var(--text-secondary)", fontSize: "20px", cursor: "pointer" }}>
                    <FaBell />
                </button>

                <div className="profile-box" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div className="profile-avatar" style={{ 
                        width: "40px", 
                        height: "40px", 
                        borderRadius: "50%", 
                        overflow: "hidden", 
                        background: "rgba(0, 217, 255, 0.1)", 
                        border: "1px solid var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                    }}>
                        {user?.avatar ? (
                            <img 
                                src={user.avatar} 
                                alt="Operative" 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                onError={(e) => { e.target.style.display='none'; }} 
                            />
                        ) : (
                            <FaUserAstronaut size={20} color="var(--primary)" />
                        )}
                    </div>

                    <div className="profile-info" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h4 style={{ margin: 0, fontFamily: "var(--font-heading)", letterSpacing: "1px", fontSize: "14px" }}>{user?.username || "Ascender"}</h4>
                        <p style={{ margin: 0, color: "var(--primary)", fontSize: "12px" }}>Rank {user?.rank || "E"}</p>
                    </div>
                </div>
            </div>
            
        </header>
    );
}

export default Topbar;