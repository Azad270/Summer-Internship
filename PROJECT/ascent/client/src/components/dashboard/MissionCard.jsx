import { FaCheckCircle, FaRegCircle, FaEdit, FaTrash, FaSyncAlt, FaStar } from "react-icons/fa";

function MissionCard({ mission, onToggle, onEdit, onDelete }) {
    // 1. Destructure the exact keys coming from the unified backend payload
    const { title, description, xp, difficulty, Completed, type } = mission;
    
    // Fallback to false just in case
    const isFinished = Completed || false;

    return (
        <div className={`mission-card ${isFinished ? "completed" : ""}`}>
            <div className="mission-left">
                <div 
                    className="mission-check"
                    onClick={onToggle} // Parent handles passing the object
                    style={{ 
                        cursor: "pointer",
                        background: isFinished ? "var(--primary)" : "rgba(0,217,255,.12)",
                        transition: "all 0.2s ease"
                    }}
                >
                    {isFinished ? <FaCheckCircle color="#02111d" /> : <FaRegCircle />}
                </div>

                <div>
                    <h3 style={{ 
                        textDecoration: isFinished ? "line-through" : "none", 
                        margin: "0 0 4px 0", 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px" 
                    }}>
                        {title}
                        
                        {/* 2. Visual Tag to differentiate Habits and Missions */}
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
                            fontWeight: "bold"
                        }}>
                            {type === "habit" ? <FaSyncAlt size={8}/> : <FaStar size={8}/>}
                            {type}
                        </span>
                    </h3>
                    
                    {/* Render Description with proper Dashboard styling */}
                    {description && (
                        <p style={{ margin: "4px 0 0 0", fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
                            {description}
                        </p>
                    )}
                                    </div>
            </div>
            
            <div className="mission-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {/* Habits might not have a difficulty set, guard clause added */}
                {difficulty && (
                    <span className={`difficulty ${difficulty.toLowerCase()}`}>
                        {difficulty}
                    </span>
                )}
                
                <span className="xp">+{xp || 10} XP</span>
                
                {/* 3. Guard against rendering CRUD actions for Habits */}
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