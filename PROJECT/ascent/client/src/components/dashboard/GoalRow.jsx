function GoalRow({ goal }) {

    const percentage = (goal.completed / goal.total) * 100;

    return (

        <div className="goal-row">

            <div className="goal-top">

                <span>{goal.title}</span>

                <span>

                    {goal.completed}/{goal.total}

                </span>

            </div>

            <div className="goal-progress">

                <div

                    className="goal-fill"

                    style={{
                        width: `${percentage}%`,
                        background: goal.color,
                    }}

                />

            </div>

        </div>

    );

}

export default GoalRow;