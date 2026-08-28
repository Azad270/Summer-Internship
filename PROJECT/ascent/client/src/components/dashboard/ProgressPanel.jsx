import { useUser } from "../../context/UserContext";
import "../../styles/DashboardStyle/stats.css";

function ProgressPanel() {
    const { user, currentLevelBaseXp, nextLevelXp } = useUser();

    // 1. Defend against undefined data during initial render
    const currentXP = user?.xp || 0;
    const baseXP = currentLevelBaseXp || 0;
    const nextXP = nextLevelXp || 100;

    // 2. Relative math for the current level
    const xpNeededThisLevel = nextXP - baseXP;
    const xpGainedThisLevel = currentXP - baseXP;

    // 3. Math.round() forces a clean integer for the UI
    const progressPercentage = xpNeededThisLevel > 0 
        ? Math.round(Math.min(100, Math.max(0, (xpGainedThisLevel / xpNeededThisLevel) * 100)))
        : 100;

    // 4. SVG Circle Math for the radial progress bar
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        /* FIX 1: Fluid panel padding using clamp() */
        <div className="panel" style={{ padding: "clamp(15px, 4vw, 30px)", display: "flex", flexDirection: "column", height: "100%", background: "rgba(10, 15, 26, 0.6)" }}>
            <h2 style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "20px", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "2px" }}>
                Player <span style={{ color: "var(--primary)" }}>Status</span>
            </h2>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, position: "relative", margin: "20px 0" }}>
                {/* FIX 2: Replaced hardcoded width/height with fluid viewBox constraints */}
                <svg viewBox="0 0 150 150" style={{ width: "100%", maxWidth: "150px", filter: "drop-shadow(0 0 12px rgba(0, 217, 255, 0.4))" }}>
                    {/* Background track */}
                    <circle 
                        cx="75" cy="75" r={radius} 
                        stroke="rgba(0, 217, 255, 0.1)" 
                        strokeWidth="12" fill="none" 
                    />
                    {/* Active progress */}
                    <circle 
                        cx="75" cy="75" r={radius} 
                        stroke="var(--primary)" 
                        strokeWidth="12" fill="none" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
                        transform="rotate(-90 75 75)"
                    />
                </svg>
                {/* Centered Percentage Text */}
                <div style={{ position: "absolute", fontSize: "1.75rem", fontWeight: "bold", color: "#fff", fontFamily: "var(--font-heading)" }}>
                    <span className="stat-number">{progressPercentage}</span>%
                </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* FIX 3: Fluid padding on stat boxes to prevent internal text clipping */}
                <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>Total XP</span>
                    <span className="stat-number" style={{ fontSize: "1.1rem" }}>{currentXP}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "var(--text-secondary)", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>Current Level</span>
                    <span className="stat-number" style={{ fontSize: "1.1rem" }}>{user?.level || 1}</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressPanel;