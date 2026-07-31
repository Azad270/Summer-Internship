import { FaCheckCircle, FaRegCircle, FaEdit, FaTrash } from "react-icons/fa";

function MissionCard({ mission, onToggle, onEdit, onDelete }) {
    const { _id, title, description, xp, difficulty, completed } = mission;

    return (
        <div className={`mission-card ${completed ? "completed" : ""}`}>
            <div className="mission-left">
                <div 
                    className="mission-check"
                    onClick={() => onToggle(_id)}
                    style={{ 
                        cursor: "pointer",
                        background: completed ? "var(--primary)" : "rgba(0,217,255,.12)",
                        transition: "all 0.2s ease"
                    }}
                >
                    {completed ? <FaCheckCircle color="#02111d" /> : <FaRegCircle />}
                </div>

                <div>
                    <h3 style={{ textDecoration: completed ? "line-through" : "none", margin: "0 0 4px 0" }}>
                        {title}
                    </h3>
                    <p style={{ margin: 0 }}>{description || "No description provided."}</p>
                </div>
            </div>
            
            <div className="mission-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className={`difficulty ${difficulty?.toLowerCase() || "easy"}`}>
                    {difficulty || "Easy"}
                </span>
                <span className="xp">+{xp || 10} XP</span>
                
                <div className="mission-actions" style={{ display: 'flex', gap: '12px', marginLeft: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '15px' }}>
                    <FaEdit 
                        style={{ cursor: "pointer", color: "var(--text-secondary)", transition: "0.2s" }} 
                        onMouseOver={(e) => e.target.style.color = "var(--primary)"}
                        onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
                        onClick={() => onEdit(mission)} 
                    />
                    <FaTrash 
                        style={{ cursor: "pointer", color: "var(--text-secondary)", transition: "0.2s" }}
                        onMouseOver={(e) => e.target.style.color = "#ff4d67"}
                        onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
                        onClick={() => onDelete(_id)} 
                    />
                </div>
            </div>
        </div>
    );
}

export default MissionCard;