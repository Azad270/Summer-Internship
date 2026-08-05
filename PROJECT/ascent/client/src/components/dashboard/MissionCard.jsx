import { FaCheckCircle, FaRegCircle, FaEdit, FaTrash, FaSyncAlt, FaStar } from "react-icons/fa";

function MissionCard({ mission, onToggle, onEdit, onDelete }) {
    // 1. Destructure the exact keys coming from the unified backend payload
    const { title, description, xp, difficulty, Completed, type } = mission;
    
    // Fallback to false just in case
    const isFinished = Completed || false;

    // 2. System Rank Converter (Matches Habits.jsx)
    const getRankBadge = (diff) => {
        if (!diff) return "E-Rank";
        const d = diff.toLowerCase();
        if (d === "easy") return "E-Rank";
        if (d === "medium") return "D-Rank";
        if (d === "hard") return "C-Rank";
        if (d === "elite") return "B-Rank";
        if (d === "Master") return "A-Rank";
        if (d === "GrandMaster") return "S-Rank";
        return diff;
    };

    return (
        <div className={`mission-card ${isFinished ? "completed" : ""}`} style={{ opacity: isFinished ? 0.6 : 1, transition: "opacity 0.3s" }}>
            <div className="mission-left">
                <div 
                    className="mission-check"
                    onClick={onToggle} 
                    style={{ 
                        cursor: "pointer",
                        background: isFinished ? "var(--primary)" : "rgba(0,217,255,.05)",
                        border: isFinished ? "none" : "1px solid var(--border-active)",
                        boxShadow: isFinished ? "0 0 15px rgba(0, 217, 255, 0.4)" : "none",
                        transition: "all 0.2s ease"
                    }}
                >
                    {isFinished ? <FaCheckCircle color="#02111d" /> : <FaRegCircle color="var(--primary)" />}
                </div>

                <div>
                    <h3 style={{ 
                        textDecoration: isFinished ? "line-through" : "none", 
                        margin: "0 0 4px 0", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        color: isFinished ? "var(--text-secondary)" : "var(--text-primary)"
                    }}>
                        {title}
                        
                        {/* Visual Tag to differentiate Habits and Missions */}
                        <span style={{
                            fontSize: "0.6rem",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            backgroundColor: type === "habit" ? "rgba(168, 85, 247, 0.15)" : "rgba(59, 130, 246, 0.15)",
                            color: type === "habit" ? "#c084fc" : "#60a5fa",
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontWeight: "bold",
                            textDecoration: "none" // Prevents line-through from bleeding into the tag
                        }}>
                            {type === "habit" ? <FaSyncAlt size={8}/> : <FaStar size={8}/>}
                            {type}
                        </span>
                    </h3>
                    
                    {/* Render Description */}
                    {description && (
                        <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.4", textDecoration: isFinished ? "line-through" : "none" }}>
                            {description}
                        </p>
                    )}
                </div>
            </div>
            
            <div className="mission-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* 3. Render the converted Rank Badge */}
                {difficulty && (
                    <span className={`badge badge-${difficulty.toLowerCase()}`} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "1px", border: "1px solid currentColor" }}>
                        {getRankBadge(difficulty)}
                    </span>
                )}
                
                {/* 4. Apply the stat-number font to the XP */}
                <span className="xp" style={{ color: "var(--primary)", fontFamily: "var(--font-heading)", letterSpacing: "1px", fontWeight: "bold" }}>
                    +<span className="stat-number">{xp || 10}</span> XP
                </span>
                
                {/* Guard against rendering CRUD actions for Habits */}
                {type === "mission" && (
                    <div className="mission-actions" style={{ display: 'flex', gap: '12px', marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '15px' }}>
                        <FaEdit 
                            style={{ cursor: "pointer", color: "var(--text-secondary)", transition: "0.2s" }} 
                            onMouseOver={(e) => e.target.style.color = "var(--primary)"}
                            onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
                            onClick={onEdit} 
                        />
                        <FaTrash 
                            style={{ cursor: "pointer", color: "var(--text-secondary)", transition: "0.2s" }}
                            onMouseOver={(e) => e.target.style.color = "#ff4d67"}
                            onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
                            onClick={onDelete} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MissionCard;