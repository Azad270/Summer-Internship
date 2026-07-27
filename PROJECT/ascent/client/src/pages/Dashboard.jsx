import MainLayout from "../components/layout/MainLayout";

import CommandCenter from "../components/dashboard/CommandCenter";
import MissionPanel from "../components/dashboard/MissionPanel";
import ProgressPanel from "../components/dashboard/ProgressPanel";
import WeeklyGoals from "../components/dashboard/WeeklyGoals";


import "../styles/dashboard.css";

function Dashboard() {

    return (

        <MainLayout>

            <main className="dashboard-content">

                <CommandCenter />

                <div className="dashboard-grid">

                    <MissionPanel />

                    <ProgressPanel />

                </div>

                <WeeklyGoals />

            </main>

        </MainLayout>

    );

}

export default Dashboard;