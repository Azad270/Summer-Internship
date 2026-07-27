import { FaCircleCheck } from "react-icons/fa6";

function MissionCard({ title, description, xp, difficulty, completed }) {
    return (
        <div className="panel mission-card">

            <div className="mission-left">

                <div
                    className={`mission-check ${
                        completed ? "completed" : ""
                    }`}
                >
                    <FaCircleCheck />
                </div>

                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>

            </div>

            <div className="mission-right">

                <span className={`difficulty ${difficulty.toLowerCase()}`}>

                    {difficulty}

                </span>

                <span className="xp">

                    +{xp} XP

                </span>

            </div>

        </div>
    );
}

export default MissionCard;