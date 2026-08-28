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
                        <h2 style={{ margin: 0, color: "var(--text-primary)", fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: "2px" }}>System Awakening</h2>
                        <div style={{ textAlign: "right" }}>
                            <h3 style={{ margin: 0, color: "var(--primary)" }}>Rank: <span className="stat-number">{user?.rank || "E"}</span></h3>
                            <span style={{ fontWeight: "bold", color: "var(--text-secondary)" }}>Level <span className="stat-number">{user?.level || 1}</span></span>
                        </div>
                    </div>
                    
                    <div style={{ width: "100%", background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-active)", borderRadius: "4px", overflow: "hidden", boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)" }}>
                        <div 
                            style={{ 
                                width: `${progressPercentage}%`, 
                                background: "linear-gradient(90deg, #009DFF 0%, var(--primary) 100%)", 
                                height: "36px", 
                                transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                boxShadow: "0 0 15px var(--primary-soft)"
                            }} 
                        />
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}>
                        <span><span className="stat-number">{user?.xp || 0}</span> / <span className="stat-number">{nextLevelXp}</span> XP</span>
                    </div>
                </section>

                {/* WIDGET 2: THE HISTORICAL VELOCITY GRAPH */}
                <section className="panel" style={{ padding: "clamp(15px, 4vw, 30px)" }}>
                    <div className="section-header" style={{ marginBottom: "30px" }}>
                        <h2 style={{ color: "var(--text-primary)", margin: 0 }}>Ascension History (Last 7 Days)</h2>
                    </div>
                    
                    {loading ? (
                        <div style={{ color: "var(--text-secondary)" }}>Loading telemetry...</div>
                    ) : (
                        <div style={{ width: "100%", height: 400, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={1}/>
                                            <stop offset="95%" stopColor="var(--primary-dark)" stopOpacity={0.2}/>
                                        </linearGradient>
                                    </defs>
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="var(--text-secondary)" 
                                        tick={{ fontSize:11, fill: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis 
                                        stroke="var(--text-secondary)" 
                                        tick={{ fill: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip 
                                        cursor={{fill: 'rgba(0, 217, 255, 0.05)'}} 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(10, 15, 26, 0.9)', 
                                            border: '1px solid var(--primary)', 
                                            color: 'var(--primary)', 
                                            borderRadius: '4px',
                                            boxShadow: '0 0 15px rgba(0, 217, 255, 0.2)',
                                            fontFamily: 'var(--font-heading)'
                                        }}
                                        itemStyle={{ color: 'var(--primary)' }}
                                    />
                                    <Bar 
                                        dataKey="xp" 
                                        fill="url(#xpGradient)" 
                                        radius={[4, 4, 0, 0]} 
                                        maxBarSize={40} 
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