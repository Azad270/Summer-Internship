import { useUser } from "../../context/UserContext";
import "../../styles/DashboardStyle/stats.css"; // Ensure your CSS import remains intact

function ProgressPanel() {
    const { user, currentLevelBaseXp, nextLevelXp } = useUser();

    // 1. Defend against undefined data during initial render
    const currentXP = user?.xp || 0;
    const baseXP = currentLevelBaseXp || 0;
    const nextXP = nextLevelXp || 100;

    // 2. Relative math for the current level
    const xpNeededThisLevel = nextXP - baseXP;
    const xpGainedThisLevel = currentXP - baseXP;

    // 3. THE FIX: Math.round() forces a clean integer for the UI
    const progressPercentage = xpNeededThisLevel > 0 
        ? Math.round(Math.min(100, Math.max(0, (xpGainedThisLevel / xpNeededThisLevel) * 100)))
        : 100;

    // 4. SVG Circle Math for the radial progress bar
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
        <div className="panel" style={{ padding: "20px", display: "flex", flexDirection: "column", height: "100%" }}>
            <h2 style={{ color: "var(--text-primary)", textAlign: "center", marginBottom: "20px" }}>
                Ascender Stats
            </h2>
            
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, position: "relative", margin: "20px 0" }}>
                <svg width="150" height="150" viewBox="0 0 150 150">
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
                        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                        transform="rotate(-90 75 75)"
                    />
                </svg>
                {/* Centered Percentage Text */}
                <div style={{ position: "absolute", fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>
                    {progressPercentage}%
                </div>
            </div>

            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", padding: "10px 15px", borderRadius: "8px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Total XP</span>
                    <span style={{ color: "#fff", fontWeight: "bold" }}>{currentXP}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.05)", padding: "10px 15px", borderRadius: "8px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Current Level</span>
                    <span style={{ color: "#fff", fontWeight: "bold" }}>{user?.level || 1}</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressPanel;