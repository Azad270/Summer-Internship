import "./../../styles/dashboard.css";

function StatsCard({ icon, title, value, subtitle, size = "small" }) {

    return (

        <div className="panel stats-card">

            <div className="stats-icon">
                {icon}
            </div>

            <div className="stats-info">

                <h4>{title}</h4>

                <h2>{value}</h2>

                <p>{subtitle}</p>

            </div>

        </div>

    );

}

export default StatsCard;