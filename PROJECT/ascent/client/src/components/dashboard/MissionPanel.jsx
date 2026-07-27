import MissionCard from "./MissionCard";

function MissionList() {
    const missions = [

        {
            id:1,
            title:"Wake Up at 6:00 AM",
            description:"Daily Habit",
            xp:40,
            difficulty:"Easy",
            completed:false,
        },

        {
            id:2,
            title:"Workout for 45 Minutes",
            description:"Fitness Mission",
            xp:80,
            difficulty:"Hard",
            completed:true,
        },

        {
            id:3,
            title:"Read 20 Pages",
            description:"Knowledge Mission",
            xp:30,
            difficulty:"Medium",
            completed:false,
        },

        {
            id:4,
            title:"Practice Coding",
            description:"Skill Development",
            xp:60,
            difficulty:"Elite",
            completed:false,
        }

    ];

    return (

        <section className="panel mission-section">
            <div className="mission-list">
                <div className="section-header">
                    <h2>Today's Missions</h2>
                    <button>Add Mission</button>

                </div>

                {
                    missions.map((mission) => (

                        <MissionCard

                            key={mission.id}
                            title={mission.title}
                            description={mission.description}
                            xp={mission.xp}
                            difficulty={mission.difficulty}
                            completed={mission.completed}

                        />

                    ))
                }
            </div>

        </section>

    );

}

export default MissionList;