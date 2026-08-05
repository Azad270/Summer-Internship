import { useUser } from "../../context/UserContext";

function CommandCenter() {
    // 1. Extract nextLevelXp from your Context
    const { user, loading, currentLevelBaseXp, nextLevelXp } = useUser();
    const hour = new Date().getHours();

    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    if (loading) {
        return (
            <section className="command-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "150px" }}>
                <h2 style={{ color: "var(--primary)", letterSpacing: "2px", animation: "pulse 1.5s infinite" }}>
                    SYNCHRONIZING ASCENDER DATA...
                </h2>
            </section>
        );
    }

    // 2. Failsafe boundary calculations to prevent NaN or Infinity in CSS
    const maxLevelXp = nextLevelXp || 100;
    const currentXp = user?.xp || 0;
    const xpNeededThisLevel = (nextLevelXp || 100) - (currentLevelBaseXp || 0);
    const xpGainedThisLevel = (user?.xp || 0) - (currentLevelBaseXp || 0);
    
    // 3. THE FIX: Math.round() forces a clean integer for the UI
    const progressPercentage = xpNeededThisLevel > 0 
    ? Math.round(Math.min(100, Math.max(0, (xpGainedThisLevel / xpNeededThisLevel) * 100)))
    : 100;

    return (
        <section className="command-center">
            
            <div className="system-status" style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", letterSpacing: "2px", fontSize: "12px", marginBottom: "15px" }}>
                <span className="online-dot" style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", boxShadow: "0 0 10px var(--primary)" }}></span>
                ASCENT OS READY
            </div>

            <h1 className="command-title" style={{ fontFamily: "var(--font-heading)" }}>
                {greeting},
                <span style={{ color: "var(--primary)", textShadow: "0 0 15px rgba(0, 217, 255, 0.4)" }}> {user?.username || "Hunter"}</span>
            </h1>

            <p className="command-description" style={{ color: "var(--text-secondary)" }}>
                Complete today's missions and continue your journey toward becoming your best self.
            </p>

            {/* UPGRADED XP BAR */}
            <div className="xp-section" style={{ marginTop: "25px" }}>
                <div className="xp-header" style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>
                        System Level <span className="stat-number" style={{ color: "#fff", fontSize: "1.3rem", marginLeft: "8px" }}>{String(user?.level || 1).padStart(2, "0")}</span>
                    </span>
                    <span style={{ color: "var(--text-secondary)" }}>
                        <span className="stat-number" style={{ color: "var(--primary)", fontSize: "1.3rem" }}>{currentXp}</span> / <span className="stat-number">{Math.floor(maxLevelXp)}</span> XP
                    </span>
                </div>
                <div className="xp-bar" style={{ width: "100%", height: "24px", background: "rgba(0,0,0,0.6)", border: "1px solid var(--border-active)", borderRadius: "4px", overflow: "hidden", boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" }}>
                    <div
                        className="xp-fill"
                        style={{ 
                            width: `${progressPercentage}%`, 
                            height: "100%",
                            background: "linear-gradient(90deg, #009DFF 0%, var(--primary) 100%)",
                            boxShadow: "0 0 15px var(--primary-soft)",
                            transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)" 
                        }}
                    />
                </div>
            </div>    
            
        </section>
    );
    
}

export default CommandCenter;