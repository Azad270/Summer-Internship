import { useUser } from "../../context/UserContext";

function CommandCenter() {
    const { user, loading } = useUser();
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

    return (
        <section className="command-center">
            
            <div className="system-status" style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", letterSpacing: "2px", fontSize: "12px", marginBottom: "15px" }}>
                <span className="online-dot" style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", boxShadow: "0 0 10px var(--primary)" }}></span>
                ASCENT OS READY
            </div>

            <h1 className="command-title">
                {greeting},
                <span style={{ color: "var(--primary)" }}> {user?.username || "Hunter"}</span>
            </h1>

            <p className="command-description">
                Complete today's missions and continue your journey toward becoming your best self.
            </p>

            <div className="xp-section">
                <div className="xp-header">
                    <span>LEVEL {String(user?.level || 1).padStart(2, "0")}</span>
                    <span>{user?.xp || 0} / 500 XP</span>
                </div>
                <div className="xp-bar">
                    <div
                        className="xp-fill"
                        style={{ width: `${((user?.xp || 0) / 500) * 100}%`, transition: "width 1s ease-out" }}
                    />
                </div>
            </div>    
            
        </section>
    );
}

export default CommandCenter;