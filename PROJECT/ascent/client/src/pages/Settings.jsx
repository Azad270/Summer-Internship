import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useUser } from "../context/UserContext"; 
import api from "../api/api";

function Settings() {
    const { user, setUser } = useUser();
    const [exporting, setExporting] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // UI Toggles
    const [emailReminders, setEmailReminders] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    
    // Profile State
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            // NOTE: You must ensure this route exists on your backend to handle updating the user document.
            const response = await api.put("/users/profile", { avatar: avatarUrl });
            
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                alert("Operative profile updated successfully.");
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            alert("Failed to synchronize profile. Check server logs.");
        } finally {
            setSaving(false);
        }
    };

    const handleExportCSV = async () => {
        setExporting(true);
        try {
            const response = await api.get("/habits/export", { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ascent_telemetry.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export data. Ensure the server route is configured.");
        } finally {
            setExporting(false);
        }
    };

    return (
        <MainLayout>
            <main className="dashboard-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                
                <div className="section-header" style={{ marginBottom: "20px" }}>
                    <h1 style={{ color: "var(--text-primary)", margin: "0 0 10px 0", fontSize: "2.5rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>
                        System <span style={{ color: "var(--primary)" }}>Settings</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", margin: 0, fontSize: "1.1rem" }}>
                        Manage your account protocols, notifications, and data telemetry.
                    </p>
                </div>

                <div className="settings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "25px" }}>
                    
                    {/* WIDGET 1: ACCOUNT PROFILE */}
                    <section className="panel" style={{ padding: "30px", background: "rgba(10, 15, 26, 0.6)", borderRadius: "12px", border: "1px solid var(--border-active)" }}>
                        <h3 style={{ color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", marginBottom: "20px", fontFamily: "var(--font-heading)" }}>Operative Profile</h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                            <div>
                                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>Display Name</label>
                                <input 
                                    type="text" 
                                    value={user?.username || "Loading..."} 
                                    disabled
                                    style={{ width: "100%", padding: "12px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", color: "#a0aec0", cursor: "not-allowed" }}
                                />
                            </div>
                            
                            <div>
                                <label style={{ display: "block", color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "5px", textTransform: "uppercase", letterSpacing: "1px" }}>Avatar Image URL</label>
                                <input 
                                    type="text" 
                                    placeholder="Paste Image or Discord image link..."
                                    value={avatarUrl} 
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    style={{ width: "100%", padding: "12px", background: "rgba(0, 217, 255, 0.02)", border: "1px solid rgba(0, 217, 255, 0.2)", borderRadius: "4px", color: "#fff", outline: "none" }}
                                />
                            </div>

                            <button 
                                onClick={handleSaveProfile}
                                disabled={saving}
                                style={{ 
                                    marginTop: "10px",
                                    width: "100%", 
                                    padding: "10px", 
                                    background: "transparent",
                                    border: "1px solid var(--primary)",
                                    color: "var(--primary)",
                                    borderRadius: "4px",
                                    cursor: saving ? "not-allowed" : "pointer",
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    transition: "all 0.2s ease"
                                }}
                                onMouseOver={(e) => {
                                    if(!saving) {
                                        e.target.style.background = "var(--primary)";
                                        e.target.style.color = "#000";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if(!saving) {
                                        e.target.style.background = "transparent";
                                        e.target.style.color = "var(--primary)";
                                    }
                                }}
                            >
                                {saving ? "Synchronizing..." : "Update Profile"}
                            </button>
                        </div>
                    </section>

                    {/* WIDGET 2: SYSTEM PREFERENCES */}
                    <section className="panel" style={{ padding: "30px", background: "rgba(10, 15, 26, 0.6)", borderRadius: "12px", border: "1px solid var(--border-active)" }}>
                        <h3 style={{ color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", marginBottom: "20px", fontFamily: "var(--font-heading)" }}>System Preferences</h3>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ color: "#ffffff", fontWeight: "600" }}>Daily Protocol Reminders</div>
                                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Receive email alerts via Nodemailer.</div>
                                </div>
                                <div 
                                    onClick={() => setEmailReminders(!emailReminders)}
                                    style={{ width: "50px", height: "26px", background: emailReminders ? "var(--primary)" : "#4a5568", borderRadius: "20px", cursor: "pointer", position: "relative", transition: "background 0.3s" }}
                                >
                                    <div style={{ position: "absolute", top: "3px", left: emailReminders ? "27px" : "3px", width: "20px", height: "20px", background: "#000", borderRadius: "50%", transition: "left 0.3s" }}></div>
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ color: "#ffffff", fontWeight: "600" }}>System Override Mode</div>
                                    <div style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>Enforce maximum contrast.</div>
                                </div>
                                <div 
                                    onClick={() => setDarkMode(!darkMode)}
                                    style={{ width: "50px", height: "26px", background: darkMode ? "var(--primary)" : "#4a5568", borderRadius: "20px", cursor: "pointer", position: "relative", transition: "background 0.3s" }}
                                >
                                    <div style={{ position: "absolute", top: "3px", left: darkMode ? "27px" : "3px", width: "20px", height: "20px", background: "#000", borderRadius: "50%", transition: "left 0.3s" }}></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WIDGET 3: DATA MANAGEMENT */}
                    <section className="panel" style={{ padding: "30px", background: "rgba(10, 15, 26, 0.6)", borderRadius: "12px", border: "1px solid var(--border-active)" }}>
                        <h3 style={{ color: "#ffffff", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "15px", marginBottom: "20px", fontFamily: "var(--font-heading)" }}>Data Management</h3>
                        
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "25px" }}>
                            Download a comprehensive CSV file of your historical protocol tracking. 
                            Use this for external telemetry and personal data analysis.
                        </p>

                        <button 
                            onClick={handleExportCSV}
                            disabled={exporting}
                            style={{ 
                                width: "100%", 
                                padding: "12px", 
                                background: exporting ? "#2d3748" : "transparent",
                                border: exporting ? "1px solid #4a5568" : "1px solid var(--primary)",
                                color: exporting ? "#a0aec0" : "var(--primary)",
                                borderRadius: "4px",
                                cursor: exporting ? "not-allowed" : "pointer",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                transition: "all 0.2s ease",
                                boxShadow: exporting ? "none" : "0 0 10px rgba(0, 217, 255, 0.1)"
                            }}
                        >
                            {exporting ? "Extracting Telemetry..." : "Export Data to CSV"}
                        </button>
                    </section>
                </div>
            </main>
        </MainLayout>
    );
}

export default Settings;