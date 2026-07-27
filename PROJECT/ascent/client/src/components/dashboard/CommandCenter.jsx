
import { useUser } from "../../context/UserContext";
function CommandCenter() {

    const { user, loading } = useUser();

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    if (loading) {

        return <div className="panel">Loading...</div>;
    
    }
    
    if (!user) {
    
        return null;
    
    }
    
    return (

        <section className="panel command-center">

            <div className="command-header">

                <div className="system-status">

                    <span className="online-dot"></span>

                    ASCENT OS READY

                </div>

                <div className="rank-card-small">

                    <small>Current Rank</small>

                    <h3>{user?.rank || "E"}</h3>

                    <p>Ascender</p>

                </div>

            </div>


            <h1 className="command-title">

                {greeting},

                <span> {user?.username}</span>

            </h1>

            <p className="command-description">

                Complete today's missions and continue your journey
                toward becoming your best self.

            </p>


            <div className="xp-section">

                <div className="xp-header">

                    <span>
                        LEVEL {String(user?.level || 1).padStart(2, "0")}
                    </span>

                    <span>
                        {user?.xp || 0} / 500 XP
                    </span>

                </div>

                <div className="xp-bar">

                    <div
                        className="xp-fill"
                        style={{
                            width: `${((user?.xp || 0) / 500) * 100}%`
                        }}
                    />

                </div>

            </div>    
        </section>

    );

}

export default CommandCenter;