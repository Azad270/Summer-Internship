import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import API from "../api/api";
import CreateHabitModal from "../components/dashboard/CreateHabitModal"; 
// 1. IMPORT ICONS FOR A SLEEK DASHBOARD LOOK
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUser } from "../context/UserContext";

function Habits() {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { setUser, setCurrentLevelBaseXp, setNextLevelXp } = useUser();

    // 2. ADD STATE TO TRACK WHICH HABIT WE ARE EDITING
    const [editingHabit, setEditingHabit] = useState(null);

    // System Rank Converter
    const getRankBadge = (difficulty) => {
        if (!difficulty) return "E-Rank";
        const diff = difficulty.toLowerCase();
        if (diff === "easy") return "E-Rank";
        if (diff === "medium") return "C-Rank";
        if (diff === "hard") return "A-Rank";
        if (diff === "elite") return "S-Rank";
        return difficulty;
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await API.get("/habits");
            const fetchedHabits = response.data.data || response.data.habits || response.data || [];
            setHabits(fetchedHabits);
        } catch (error) {
            console.error("Failed to fetch habits:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. OPEN MODAL FOR CREATING
    const openCreateModal = () => {
        setEditingHabit(null);
        setIsModalOpen(true);
    };

    // 4. OPEN MODAL FOR EDITING
    const openEditModal = (habit) => {
        setEditingHabit(habit);
        setIsModalOpen(true);
    };

    // 5. SMART SUBMIT PIPELINE (PUT VS POST)
    const handleHabitSubmit = async (habitData) => {
        try {
            if (editingHabit) {
                // We are editing: Use PUT request to your API
                await API.put(`/habits/${editingHabit._id}`, habitData);
            } else {
                // We are creating: Use POST request
                await API.post("/habits", habitData);
            }
            fetchHabits();
            setIsModalOpen(false); 
        } catch (error) {
            console.error("Failed to save habit:", error);
            alert("Error saving habit.");
        }
    };

    const handleDelete = async (habitId) => {
        if (!window.confirm("WARNING: Deleting this habit will remove it permanently. Continue?")) return;
        try {
            const response = await API.delete(`/habits/${habitId}`);
            setHabits(habits.filter(h => h._id !== habitId));
            
            // 3. PUSH UPDATED DATA TO GLOBAL STATE
            if (response.data && response.data.user) {
                setUser(response.data.user);
                setCurrentLevelBaseXp(response.data.currentLevelBaseXp);
                setNextLevelXp(response.data.nextLevelXp);
            }
        } catch (error) {
            console.error("Failed to delete habit:", error);
            fetchHabits();
        }
    };

    const filteredHabits = habits.filter(habit => {
        const title = habit.title || habit.name || ""; 
        const desc = habit.description || "";
        return title.toLowerCase().includes(searchQuery) || desc.toLowerCase().includes(searchQuery);
    });

    return (
        <MainLayout>
            <main className="dashboard-content">
                <section className="command-center">
                    <h1 className="command-title">
                        Quest <span style={{ color: "var(--primary)" }}>Log</span>
                    </h1>
                    <p className="command-description">
                        Define and manage your recurring System protocols. 
                    </p>
                </section>

                <div className="bento-grid">
                    <div className="grid-left" style={{ width: "100%" }}>
                        
                        {searchQuery && (
                            <div style={{ marginBottom: "20px", color: "var(--text-secondary)" }}>
                                <span>Displaying system search for: </span>
                                <strong style={{ color: "var(--primary)" }}>"{searchQuery}"</strong>
                            </div>
                        )}

                        <div className="action-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h3 style={{fontFamily: "var(--font-heading)", fontSize: "1.5rem"}}>Active Quests ({filteredHabits.length})</h3>
                            <button className="btn-primary" onClick={openCreateModal} style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", color: "#000", border: "none", padding: "10px 20px", borderRadius: "6px", fontWeight: "800", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 0 15px rgba(0, 217, 255, 0.4)" }}>
                                + Assign Quest
                            </button>
                        </div>

                        {loading ? (
                            <p>Loading repository data...</p>
                        ) : filteredHabits.length === 0 ? (
                            <div className="panel" style={{ padding: "30px", textAlign: "center", border: "1px dashed rgba(0, 217, 255, 0.2)" }}>
                                <h3 style={{ color: "var(--text-secondary)" }}>
                                    {searchQuery 
                                        ? `No habits found matching "${searchQuery}".` 
                                        : "No habits established yet."}
                                </h3>
                            </div>
                        ) : (
                            <div className="habit-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                                {filteredHabits.map(habit => (
                                    <div key={habit._id} className="panel flex-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px" }}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 5px 0" }}>
                                                <h4 style={{ margin: 0, fontSize: "1.1rem" }}>{habit.title || habit.name || "Untitled Protocol"}</h4>
                                                
                                                {habit.difficulty && (
                                                    <span className={`badge badge-${habit.difficulty.toLowerCase()}`} style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "1px", border: "1px solid currentColor" }}>
                                                        {getRankBadge(habit.difficulty)}
                                                    </span>
                                                )}
                                            </div>
                                            {/* 7. NEW DESCRIPTION BLOCK */}
                                            {habit.description && (
                                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "6px", lineHeight: "1.4" }}>
                                                    {habit.description}
                                                </div>
                                            )}
                                            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Yields <strong style={{ color: "var(--text)" }}>{habit.xp} XP</strong> per completion</span>
                                        </div>
                                        
                                        {/* 6. REPLACED UGLY BUTTONS WITH DASHBOARD ICONS */}
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <button onClick={() => openEditModal(habit)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.1rem" }} title="Edit Habit">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(habit._id)} style={{ background: "none", border: "none", color: "#ff4757", cursor: "pointer", fontSize: "1.1rem" }} title="Delete Habit">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <CreateHabitModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    onSubmit={handleHabitSubmit} 
                    initialData={editingHabit} 
                />
            </main>
        </MainLayout>
    );
}

export default Habits;