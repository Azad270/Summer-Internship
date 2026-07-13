import {
    FaHouse,
    FaChartLine,
    FaBullseye,
    FaFire,
    FaGear,
    FaRightFromBracket
} from "react-icons/fa6";

function Sidebar() {

    return (

        <aside className="sidebar">

            <div>

                <h2 className="sidebar-logo">
                    ASCENT
                </h2>

                <nav className="sidebar-menu">

                    <a href="#" className="active">
                        <FaHouse />
                        <span>Dashboard</span>
                    </a>

                    <a href="#">
                        <FaChartLine />
                        <span>Progress</span>
                    </a>

                    <a href="#">
                        <FaBullseye />
                        <span>Habits</span>
                    </a>

                    <a href="#">
                        <FaFire />
                        <span>Streaks</span>
                    </a>

                    <a href="#">
                        <FaGear />
                        <span>Settings</span>
                    </a>

                </nav>

            </div>

            <button className="logout-btn">

                <FaRightFromBracket />

                <span>Logout</span>

            </button>

        </aside>

    );
}

export default Sidebar;