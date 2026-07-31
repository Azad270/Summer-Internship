import { useState, useEffect } from "react";
import MissionCard from "./MissionCard";
import CreateMissionModal from "./CreateMissionModal";
import API from "../../api/api";
import { useUser } from "../../context/UserContext";

function MissionPanel() {
    const [missions, setMissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMission, setEditingMission] = useState(null); 
    
    const { setUser } = useUser();

    useEffect(() => {
        fetchMissions();
    }, []);

    const fetchMissions = async () => {
        try {
            const response = await API.get("/missions");
            setMissions(response.data.missions);
        } catch (error) {
            console.error("Failed to fetch missions", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleMission = async (id) => {
        try {
            setMissions(missions.map(m => 
                m._id === id ? { ...m, completed: !m.completed } : m
            ));
            
            const response = await API.put(`/missions/${id}`);

            if (response.data.user) {
                setUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to toggle mission", error);
            fetchMissions(); 
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this mission?")) return;

        try {
            setMissions(missions.filter(m => m._id !== id));
            await API.delete(`/missions/${id}`);
        } catch (error) {
            console.error("Failed to delete mission", error);
            fetchMissions(); 
        }
    };

    const openEditModal = (mission) => {
        setEditingMission(mission);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingMission(null); 
        setIsModalOpen(true);
    };

    const handleMissionSubmit = async (missionData) => {
        try {
            if (editingMission) {
                const response = await API.put(`/missions/${editingMission._id}/edit`, missionData);
                setMissions(missions.map(m => m._id === editingMission._id ? response.data.mission : m));
            } else {
                const response = await API.post("/missions", missionData);
                setMissions([response.data.mission, ...missions]); 
            }
            setIsModalOpen(false); 
        } catch (error) {
            console.error("Failed to submit mission", error);
            alert("Error saving mission.");
        }
    };

    return (
        <section className="mission-section">
            <div className="section-header">
                <h2>Today's Missions</h2>
                <button onClick={openCreateModal}>Add Mission</button>
            </div>

            <div className="mission-list">
               {/* We removed the .filter() logic here so all missions are displayed */}
               {missions.length === 0 ? (
                    <p style={{ color: "var(--text-secondary)" }}>No missions assigned for today. Add one to begin.</p>
                ) : (
                    missions.map((mission) => (
                        <MissionCard
                            key={mission._id}
                            mission={mission}          
                            onToggle={toggleMission}
                            onEdit={openEditModal}     
                            onDelete={handleDelete}    
                        />
                    ))
                )}
            </div>

            <CreateMissionModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSubmit={handleMissionSubmit}
                initialData={editingMission} 
            />
        </section>
    );
}

export default MissionPanel;