import { useState, useEffect, useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api/api"; 
import MainLayout from "../components/layout/MainLayout";
// TODO: Import your actual context here to get the user and XP boundaries
import { useUser } from "../context/UserContext"; 

function Progress() {
    
    const { user, currentLevelBaseXp, nextLevelXp } = useUser();

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await API.get("/missions/history");
            setChartData(response.data.data);
        } catch (error) {
            console.error("Failed to fetch history", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Safely calculate the absolute XP math for the progress bar
    const xpNeededThisLevel = (nextLevelXp || 100) - (currentLevelBaseXp || 0);
    const xpGainedThisLevel = (user?.xp || 0) - (currentLevelBaseXp || 0);
    const progressPercentage = xpNeededThisLevel > 0 
    ? Math.min(100, Math.max(0, (xpGainedThisLevel / xpNeededThisLevel) * 100))
    : 100; // Cap at 100% if the level max is reached

    return (
        <MainLayout>
            {/* Added flex layout to stack the widgets cleanly */}
            <main className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}> 
                
                {/* WIDGET 1: THE XP PROGRESS BAR */}
                <section className="panel" style={{ padding: "30px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <h2 style={{ margin: 0, color: "var(--text-primary)" }}>Current Ascension</h2>
                        <div style={{ textAlign: "right" }}>
                            <h3 style={{ margin: 0, color: "var(--primary)" }}>Rank: {user?.rank || "E"}</h3>
                            <span style={{ fontWeight: "bold" }}>Level {user?.level || 1}</span>
                        </div>
                    </div>
                    
                    <div style={{ width: "100%", background: "#222", borderRadius: "10px", overflow: "hidden" }}>
                        <div 
                            style={{ 
                                width: `${progressPercentage}%`, 
                                background: "linear-gradient(90deg, var(--primary) 0%, #00ffcc 100%)", 
                                height: "24px", 
                                transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)" 
                            }} 
                        />
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                        <span>XP: {user?.xp || 0} / {nextLevelXp}</span>
                    </div>
                </section>

                {/* WIDGET 2: THE HISTORICAL VELOCITY GRAPH */}
                <section className="panel" style={{ padding: "30px" }}>
                    <div className="section-header" style={{ marginBottom: "30px" }}>
                        <h2 style={{ color: "var(--text-primary)", margin: 0 }}>Ascension History (Last 7 Days)</h2>
                    </div>
                    
                    {loading ? (
                        <div style={{ color: "var(--text-secondary)" }}>Loading telemetry...</div>
                    ) : (
                        <div style={{ width: "100%", height: 400 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="var(--text-secondary)" 
                                        tick={{ fill: 'var(--text-secondary)' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis 
                                        stroke="var(--text-secondary)" 
                                        tick={{ fill: 'var(--text-secondary)' }}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip 
                                        cursor={false} 
                                        contentStyle={{ 
                                            backgroundColor: 'var(--bg-secondary)', 
                                            border: '1px solid var(--border)', 
                                            color: '#fff', 
                                            borderRadius: '8px' 
                                        }}
                                        isAnimationActive={false} 
                                    />
                                    <Bar 
                                        dataKey="xp" 
                                        fill="var(--primary)" 
                                        radius={[4, 4, 0, 0]} 
                                        barSize={40} 
                                        activeBar={false}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </section>
                
            </main>
        </MainLayout>
    );
}

export default Progress;