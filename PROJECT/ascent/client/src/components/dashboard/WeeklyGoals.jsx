import GoalRow from "./GoalRow";

function WeeklyGoals() {

    const goals = [

        {
            title: "Workout",
            completed: 4,
            total: 5,
            color: "#00d9ff",
        },

        {
            title: "Reading",
            completed: 3,
            total: 5,
            color: "#7c3aed",
        },

        {
            title: "Water Intake",
            completed: 7,
            total: 7,
            color: "#22c55e",
        },

        {
            title: "Meditation",
            completed: 2,
            total: 5,
            color: "#f59e0b",
        },

    ];

    return (

        <section className="panel weekly-goals">

            <h2>Weekly Goals</h2>

            <div className="weekly-list">

                {goals.map((goal) => (

                    <GoalRow
                        key={goal.title}
                        goal={goal}
                    />

                ))}

            </div>

        </section>

    );

}

export default WeeklyGoals;