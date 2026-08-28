import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import FaBars for the hamburger menu
import { FaBell, FaMagnifyingGlass, FaUserAstronaut, FaBars } from "react-icons/fa6"; 
import { useUser } from "../../context/UserContext"; 

// Explicitly destructing the toggleSidebar prop
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
            
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Mobile Menu Trigger */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={toggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <FaBars />
                </button>

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
                                onError={(e) => { e.target.style.display='none'; }} 
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