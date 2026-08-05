
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
                        <span>System Status</span>
                    </NavLink>

                    <NavLink
                        to="/habits"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaBullseye />
                        <span>Quest Log</span>
                    </NavLink>

                    <NavLink
                        to="/progress"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaChartLine />
                        <span>Hunter Assessment</span>
                    </NavLink>

                    <NavLink
                        to="/streaks"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaFire />
                        <span>Survival Streak</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >
                        <FaGear />
                        <span>System Config</span>
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