function WelcomeBanner() {
    return (

        <section className="welcome-banner">

            <div className="welcome-left">

                <p className="system-text">
                    SYSTEM ONLINE
                </p>

                <h1>
                    Welcome Back,
                    <span> Ascender</span>
                </h1>

                <p className="welcome-description">
                    Complete today's missions, gain XP,
                    level up and unlock your true potential.
                </p>

            </div>

            <div className="welcome-right">

                <div className="rank-card">

                    <h3>Current Rank</h3>

                    <h2>E</h2>

                    <p>Ascender Rank</p>

                </div>

            </div>

        </section>

    );
}

export default WelcomeBanner;