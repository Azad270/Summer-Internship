import MainLayout from "../components/layout/MainLayout";
import CommandCenter from "../components/dashboard/CommandCenter";
import MissionPanel from "../components/dashboard/MissionPanel";
import ProgressPanel from "../components/dashboard/ProgressPanel";
import "../styles/DashboardStyle/commandCenter.css";
import "../styles/DashboardStyle/dashboardLayout.css";
import "../styles/DashboardStyle/mission.css";
import "../styles/DashboardStyle/progressPanel.css";
import "../styles/DashboardStyle/sidebar.css";
import "../styles/DashboardStyle/stats.css";
import "../styles/DashboardStyle/topbar.css";



function Dashboard() {
    return (
        <MainLayout>
            <main className="dashboard-content">
                
                {/* 1. FULL WIDTH HEADER */}
                <CommandCenter />

                {/* 2. TWO-COLUMN GRID (Missions Left, Stats Right) */}
                <div className="bento-grid">
                    
                    <div className="grid-left">
                        <MissionPanel />
                    </div>

                    <div className="grid-right">
                        <ProgressPanel />
                    </div>

                </div>

            </main>
        </MainLayout>
    );
}

export default Dashboard;