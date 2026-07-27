import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-main">

                <Topbar />

                {children}

            </div>

        </div>

    );

}

export default MainLayout;