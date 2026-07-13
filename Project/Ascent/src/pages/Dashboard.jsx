import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import "../styles/dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-main">

                <Topbar />

                <main className="dashboard-content">
                    <WelcomeBanner />
                </main>

            </div>

        </div>
    );
}

export default Dashboard;