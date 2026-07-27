import { FaBolt, FaFire } from "react-icons/fa6";

function WelcomeBanner() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <section className="panel welcome-banner">

            <div className="welcome-left">

                <p className="system-text">

                    <span className="online-dot"></span>

                    SYSTEM ONLINE

                </p>

                <h1>

                    Welcome to ASCENT,

                    <span> {user?.username}</span>

                </h1>

                <p className="welcome-description">

                    Complete today's missions, gain XP,
                    level up and unlock your true potential.

                </p>

                <div className="xp-section">

                    <div className="xp-header">

                        <span>
                            LEVEL {String(user?.level).padStart(2, "0")}
                        </span>

                        <span>
                            {user?.xp} / 500 XP
                        </span>

                    </div>

                    <div className="xp-bar">

                        <div
                            className="xp-fill"
                            style={{
                                width: `${(user?.xp / 500) * 100}%`
                            }}
                        />

                    </div>

                </div>

                <div className="banner-stats">

                    <div className="banner-stat">

                        <FaBolt />

                        <div>

                            <small>Today's XP</small>

                            <strong>+40 XP</strong>

                        </div>

                    </div>

                    <div className="banner-stat">

                        <FaFire />

                        <div>

                            <small>Current Streak</small>

                            <strong>{user?.streak ?? 0} Days</strong>

                        </div>

                    </div>

                </div>
                

            </div>

            <div className="welcome-right">

                <div className="panel rank-card">

                    <h3>Current Rank</h3>

                    <h2>{user?.rank}</h2>

                    <p>Ascender Rank</p>

                </div>

            </div>

        </section>

    );

}

export default WelcomeBanner;