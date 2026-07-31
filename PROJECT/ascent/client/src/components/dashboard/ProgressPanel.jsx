import { useUser } from "../../context/UserContext";
 // Ensure this is imported if not globally available

function ProgressPanel() {
    const { user } = useUser();

    // Safely pull stats from the user context
    const currentXP = user?.xp || 0;
    const currentLevel = user?.level || 1;
    const xpGoal = 500; 
    
    // Calculate accurate completion percentage
    const progressPercentage = Math.min(Math.round((currentXP / xpGoal) * 100), 100);

    return (
        /* 
          Removed the inline style object completely. 
          The .panel class handles the base glass look and the hover state.
          The .progress-panel class handles the padding and flex gap.
        */
        <section className="panel progress-panel">
            {/* Handled by designSystem.css */}
            <h3 className="panel-title">Ascender Stats</h3>
            
            <div className="flex-center">
                {/* 
                  Only the dynamic gradient remains inline, mapping to your CSS variables. 
                  Everything else is handled by .progress-ring in progressPanel.css.
                */}
                <div 
                    className="progress-ring" 
                    style={{ 
                        background: `conic-gradient(var(--primary) ${progressPercentage}%, var(--border) 0%)` 
                    }}
                >
                    <div className="ring-value">
                        {progressPercentage}%
                    </div>
                </div>
            </div>

            {/* Handled by progressPanel.css */}
            <div className="stats-list">
                <div className="stat-row">
                    <span>Total XP</span>
                    <strong className="xp">{currentXP}</strong>
                </div>
                <div className="stat-row">
                    <span>Current Level</span>
                    <strong>{currentLevel}</strong>
                </div>
            </div>
        </section>
    );
}

export default ProgressPanel;