import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaBell,
    FaMagnifyingGlass,
    FaUserAstronaut
} from "react-icons/fa6";
import { useUser } from "../../context/UserContext"; // Adjust path if necessary

function Topbar() {
    // Bring in user data and router navigation
    const { user } = useUser();
    const navigate = useNavigate();
    
    // State to hold what the user types in the search bar
    const [searchQuery, setSearchQuery] = useState("");

    // Function to trigger when a key is pressed
    const handleSearch = (e) => {
        // If they press Enter and the box isn't empty
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            // Send them to the habits page with a URL parameter
            navigate(`/habits?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(""); // Clear the input box after searching
        }
    };

    return (
        <header className="topbar">
            
            <div className="search-box">
                <FaMagnifyingGlass style={{ color: "var(--text-secondary)" }} />
                <input
                    type="text"
                    placeholder="Search habits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch} /* Listen for the Enter key */
                />
            </div>

            <div className="topbar-right">
                
                <button className="notification-btn">
                    <FaBell />
                </button>

                <div className="profile-box">
                    <div className="profile-avatar">
                        <FaUserAstronaut />
                    </div>

                    <div>
                        {/* Dynamically render the user's name and rank */}
                        <h4>{user?.username || "Ascender"}</h4>
                        <p>Rank {user?.rank || "E"}</p>
                    </div>
                </div>

            </div>
            
        </header>
    );
}

export default Topbar;