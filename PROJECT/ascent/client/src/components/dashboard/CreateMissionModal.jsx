import { useState, useEffect } from "react";

function CreateMissionModal({ isOpen, onClose, onSubmit, initialData }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [xp, setXp] = useState(10);
    const [difficulty, setDifficulty] = useState("Easy");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || "");
            setXp(initialData.xp);
            setDifficulty(initialData.difficulty);
        } else {
            setTitle("");
            setDescription("");
            setXp(10);
            setDifficulty("Easy");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, xp: Number(xp), difficulty });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{initialData ? "Edit Mission" : "New Mission"}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Mission Title</label>
                        <input 
                            type="text" 
                            required 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Complete 50 Pushups" 
                        />
                    </div>

                    <div className="input-group">
                        <label>Description (Optional)</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Add specifics or context..." 
                        />
                    </div>

                    <div className="input-group" style={{ flexDirection: "row", gap: "20px" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label>XP Reward</label>
                            <input 
                                type="number" 
                                required 
                                min="1" 
                                value={xp} 
                                onChange={(e) => setXp(e.target.value)} 
                            />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label>Difficulty</label>
                            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                                <option value="Elite">Elite</option>
                            </select>
                        </div>
                    </div>
                         
                    <button type="submit" className="submit-btn">
                        {initialData ? "SAVE CHANGES" : "DEPLOY MISSION"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateMissionModal;