import { useState, useEffect } from "react";
import MissionCard from "./MissionCard";
import CreateMissionModal from "./CreateMissionModal";
import API from "../../api/api";
import { useUser } from "../../context/UserContext";

function MissionPanel() {
    const [dailyActions, setDailyActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAction, setEditingAction] = useState(null); 
    
    // 1. EXTRACTION: Pull the new setters from your Context
    const { setUser, setCurrentLevelBaseXp, setNextLevelXp } = useUser();
    const today = new Date().toLocaleDateString('en-CA');

    useEffect(() => {
        fetchDailyDashboard();
    }, []);

    const fetchDailyDashboard = async () => {
        try {
            const response = await API.get(`/dashboard/daily?date=${today}`);
            setDailyActions(response.data.data);
        } catch (error) {
            console.error("Failed to fetch daily actions", error);
        } finally {
            setLoading(false);
        }
    };


    
    const toggleAction = async (action) => {
        // Optimistic UI update
        setDailyActions(dailyActions.map(a => 
            a._id === action._id ? { ...a, Completed: !a.Completed } : a
        ));
        
        try {
            let response;
            if (action.type === "habit") {
                response = await API.put(`/habits/${action._id}/toggle`, { date: today });
            } else {
                response = await API.put(`/missions/${action._id}`);
            }

            // ==========================================
            // 2. THE SYNC (XP GAIN)
            // ==========================================
            if (response.data && response.data.user) {
                setUser(response.data.user);
                setCurrentLevelBaseXp(response.data.currentLevelBaseXp);
                setNextLevelXp(response.data.nextLevelXp);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.error("Failed to toggle action", error);
            fetchDailyDashboard(); 
        }
    };

    const handleDelete = async (action) => {
        if (action.type === "habit") {
            alert("Habits must be deleted from the Habits Manager page.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this mission?")) return;

        try {
            setDailyActions(dailyActions.filter(a => a._id !== action._id));
            
            const response = await API.delete(`/missions/${action._id}`);
            
            // ==========================================
            // 3. THE SYNC (XP LOSS REVERT)
            // ==========================================
            if (response.data && response.data.user) {
                setUser(response.data.user);
                setCurrentLevelBaseXp(response.data.currentLevelBaseXp);
                setNextLevelXp(response.data.nextLevelXp);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.error("Failed to delete mission", error);
            fetchDailyDashboard(); 
        }
    };
    
    const openEditModal = (action) => {
        if (action.type === "habit") {
            alert("Habits cannot be edited from the daily view.");
            return;
        }
        setEditingAction(action);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingAction(null); 
        setIsModalOpen(true);
    };

    const handleMissionSubmit = async (missionData) => {
        try {
            if (editingAction) {
                await API.put(`/missions/${editingAction._id}/edit`, missionData);
            } else {
                const payload = { ...missionData, date: today };
                await API.post("/missions", payload);
            }
            fetchDailyDashboard();
            setIsModalOpen(false); 
        } catch (error) {
            console.error("Failed to submit mission", error);
            alert(error.response?.data?.message || "Error saving mission.");
        }
    };
    
    return (
        <section className="mission-section">
            <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", margin: 0, textTransform: "uppercase" }}>Daily Quests</h2>
                <button 
                    onClick={openCreateModal}
                    className="btn-primary"
                    style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#000", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "800", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 0 15px rgba(0, 217, 255, 0.4)" }}
                >
                    + Assign Quest
                </button>
            </div>

            <div className="mission-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
               {dailyActions.length === 0 ? (
                    <div className="panel" style={{ padding: "30px", textAlign: "center", border: "1px dashed rgba(0, 217, 255, 0.2)" }}>
                        <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>No daily quests assigned by the System. Add one to begin leveling.</p>
                    </div>
                ) : (
                    dailyActions.map((action) => (
                        <MissionCard
                            key={action._id}
                            mission={action}         
                            onToggle={() => toggleAction(action)} 
                            onEdit={() => openEditModal(action)}     
                            onDelete={() => handleDelete(action)}    
                        />
                    ))
                )}
            </div>

            <CreateMissionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleMissionSubmit}
                initialData={editingAction} 
            />
        </section>
    );
}

export default MissionPanel;