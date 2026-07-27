import {
    FaBolt,
    FaBullseye,
    FaFire,
    FaChartSimple,
} from "react-icons/fa6";

function ProgressPanel() {

    return (

        <section className="panel progress-panel">

            <h2 className="panel-title">
                Ascender Stats
            </h2>

            <div className="progress-ring">

                <div className="ring-value">
                    50%
                </div>

            </div>

            <div className="stats-list">

                <div className="stat-row">
                    <FaBolt />
                    <span>Today's XP</span>
                    <strong>+40</strong>
                </div>

                <div className="stat-row">
                    <FaFire />
                    <span>Current Streak</span>
                    <strong>0 Days</strong>
                </div>

                <div className="stat-row">
                    <FaBullseye />
                    <span>Completed</span>
                    <strong>3 / 6</strong>
                </div>

                <div className="stat-row">
                    <FaChartSimple />
                    <span>Daily Goal</span>
                    <strong>200 XP</strong>
                </div>

            </div>

        </section>

    );

}

export default ProgressPanel;