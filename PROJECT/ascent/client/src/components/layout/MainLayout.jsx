import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard">
            
            {/* 1. The Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="sidebar-overlay" 
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* 2. The Dynamic Sidebar Wrapper */}
            <div className={`sidebar-wrapper ${isSidebarOpen ? 'is-open' : ''}`}>
                <Sidebar />
            </div>

            <div className="dashboard-main">
                {/* 3. Passing the toggle function to your Topbar */}
                <Topbar toggleSidebar={toggleSidebar} />
                {children}
            </div>

        </div>
    );
}

export default MainLayout;