import { useState, useEffect } from "react";
import api from "../api/api";
import MainLayout from "../components/layout/MainLayout"; 

function Streaks() {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStreakData = async () => {
            try {
                const res = await api.get("/habits");
                
                if (res.data.success) {
                    const sortedHabits = res.data.data.sort((a, b) => b.currentStreak - a.currentStreak);
                    setHabits(sortedHabits);
                } else {
                    setError(res.data.message || "Data extraction failed.");
                }
            } catch (err) {
                console.error("Streak Fetch Error:", err);
                setError("Failed to synchronize streak data with the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchStreakData();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <main className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <section className="panel" style={{ padding: "30px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
                        <h2 style={{ color: "var(--primary)", letterSpacing: "2px", animation: "pulse 1.5s infinite" }}>
                            ANALYZING PROTOCOL CONSISTENCY...
                        </h2>
                    </section>
                </main>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            {/* MATCHING YOUR PROGRESS.JSX LAYOUT WRAPPERS */}
            <main className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <section className="panel" style={{ padding: "30px" }}>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", letterSpacing: "2px", fontSize: "12px", marginBottom: "15px" }}>
                        <span style={{ width: "8px", height: "8px", background: "var(--primary)", borderRadius: "50%", boxShadow: "0 0 10px var(--primary)" }}></span>
                        STREAK ANALYSIS ACTIVE
                    </div>

                    <div className="section-header" style={{ marginBottom: "30px" }}>
                        <h2 style={{ color: "var(--text-primary)", margin: "0 0 10px 0", fontSize: "2.5rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>
                            Survival <span style={{ color: "var(--primary)" }}>Streak</span>
                        </h2>
                        <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "1.1rem" }}>
                            A broken chain is a failure of discipline. Do not let the system down.
                        </p>
                    </div>

                    {error && (
                        <div style={{ color: "#ff4757", marginBottom: "30px", padding: "15px", border: "1px solid #ff4757", borderRadius: "4px", background: "rgba(255, 71, 87, 0.1)" }}>
                            {error}
                        </div>
                    )}

                    {/* FIX: Changed auto-fill to auto-fit to remove the empty space void */}
                    <div className="streaks-grid" style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                        gap: "25px" 
                    }}>
                        {habits.length === 0 ? (
                            <p style={{ color: "var(--text-secondary)", gridColumn: "1 / -1" }}>No active protocols found. Add habits to the system.</p>
                        ) : (
                            habits.map(habit => {
                                const isAlive = habit.currentStreak > 0;
                                
                                return (
                                    <div key={habit._id} className="streak-card" style={{
                                        background: "rgba(15, 23, 42, 0.4)", // Slightly more transparent to contrast with the panel
                                        border: isAlive ? "1px solid var(--primary)" : "1px solid #2d3748",
                                        borderRadius: "12px",
                                        padding: "35px 20px",
                                        boxShadow: isAlive ? "0 0 20px rgba(0, 229, 255, 0.1)" : "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease"
                                    }}>
                                        <h3 style={{ 
                                            margin: "0 0 20px 0", 
                                            color: isAlive ? "var(--text-primary)" : "var(--text-secondary)", 
                                            fontSize: "1.2rem",
                                            fontWeight: "600",
                                            letterSpacing: "1px"
                                        }}>
                                            {/* Assuming you fixed your schema variable to 'title' */}
                                            {habit.title || "Unknown Habit"}
                                        </h3>
                                        
                                        <div className="streak-number" style={{
                                            fontSize: "4.5rem",
                                            fontWeight: "900",
                                            color: isAlive ? "var(--primary)" : "#4a5568",
                                            textShadow: isAlive ? "0 0 25px var(--primary)" : "none",
                                            marginBottom: "10px",
                                            lineHeight: "1"
                                        }}>
                                            {habit.currentStreak}
                                        </div>
                                        
                                        <span style={{ 
                                            color: isAlive ? "var(--primary)" : "var(--text-secondary)", 
                                            opacity: isAlive ? "0.8" : "0.5",
                                            textTransform: "uppercase", 
                                            letterSpacing: "3px", 
                                            fontSize: "0.85rem",
                                            fontWeight: "700"
                                        }}>
                                            {habit.currentStreak === 1 ? "Day" : "Days"}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>

                </section>
                
            </main>
        </MainLayout>
    );
}

export default Streaks;