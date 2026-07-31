
import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHouse,
    FaChartLine,
    FaBullseye,
    FaFire,
    FaGear,
    FaRightFromBracket
} from "react-icons/fa6";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", {
            replace: true,
        });

    };

    return (

        <aside className="sidebar">

            <div>

                <h2 className="sidebar-logo">
                    ASCENT
                </h2>

                <nav className="sidebar-menu">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaHouse />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/progress"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaChartLine />
                        <span>Progress</span>
                    </NavLink>

                    <NavLink
                        to="/habits"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaBullseye />
                        <span>Habits</span>
                    </NavLink>

                    <NavLink
                        to="/streaks"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaFire />
                        <span>Streaks</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaGear />
                        <span>Settings</span>
                    </NavLink>

                </nav>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                <FaRightFromBracket />

                <span>Logout</span>

            </button>

        </aside>

    );
}

export default Sidebar;