import { useState, useEffect } from "react";

function CreateHabitModal({ isOpen, onClose, onSubmit, initialData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [xp, setXp] = useState(20);
    const [difficulty, setDifficulty] = useState("Easy");

    // Listen for initialData. If it exists, pre-fill the form for editing.
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setXp(initialData.xp || 20);
            setDifficulty(initialData.difficulty || "Easy");

        } else {
            setTitle("");
            setDescription("");
            setXp(20);
            setDifficulty("Easy");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, xp: Number(xp), difficulty });
    };

    return (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
            <div className="modal-content panel" style={{ width: "400px", padding: "20px", background: "#0f172a", border: "1px solid rgba(0, 217, 255, 0.2)", borderRadius: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    {/* Dynamically change title based on mode */}
                    <h2 style={{ margin: 0 }}>{initialData ? "Edit Protocol" : "Initialize New Habit"}</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text)", fontSize: "1.5rem", cursor: "pointer" }}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>HABIT TITLE</label>
                        <input 
                            required 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            style={{ padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "4px" }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>DESCRIPTION (OPTIONAL)</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Add specifics or context..."
                            style={{ padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "4px", minHeight: "80px", resize: "vertical" }}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "15px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                            <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>XP REWARD</label>
                            <input 
                                required 
                                type="number" 
                                value={xp} 
                                onChange={(e) => setXp(e.target.value)} 
                                style={{ padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "4px" }}
                            />
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
                            <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>DIFFICULTY</label>
                            <select 
                                value={difficulty} 
                                onChange={(e) => setDifficulty(e.target.value)}
                                style={{ padding: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: "4px" }}
                            >
                                <option value="Easy" style={{ color: "black" }}>Easy</option>
                                <option value="Medium" style={{ color: "black" }}>Medium</option>
                                <option value="Hard" style={{ color: "black" }}>Hard</option>
                                <option value="Elite" style={{ color: "black" }}>Elite</option>
                                <option value="Master" style={{ color: "black" }}>Master</option>
                                <option value="GrandMaster" style={{ color: "black" }}>GrandMaster</option>
                                
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ padding: "12px", marginTop: "10px", background: "var(--primary)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>
                        {initialData ? "UPDATE HABIT" : "DEPLOY HABIT"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateHabitModal;