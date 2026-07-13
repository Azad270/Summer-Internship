import {
    FaBell,
    FaMagnifyingGlass,
    FaUserAstronaut
} from "react-icons/fa6";

function Topbar() {

    return (

        <header className="topbar">

            <div className="search-box">

                <FaMagnifyingGlass />

                <input
                    type="text"
                    placeholder="Search habits..."
                />

            </div>

            <div className="topbar-right">

                <button className="notification-btn">

                    <FaBell />

                </button>

                <div className="profile-box">

                    <div className="profile-avatar">

                        <FaUserAstronaut />

                    </div>

                    <div>

                        <h4>Ascender</h4>

                        <p>Rank E</p>

                    </div>

                </div>

            </div>

        </header>

    );
}

export default Topbar;