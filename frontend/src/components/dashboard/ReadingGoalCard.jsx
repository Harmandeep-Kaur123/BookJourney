import Card from "../common/Card";

function ReadingGoalCard({ goal }) {
    const progress = Math.min(goal.progress, 100);

    return (
        <Card className="mt-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Reading Goal
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {goal.completed} of {goal.target} books completed
                    </p>
                </div>

                <span className="text-xl font-bold text-amber-600">
                    {progress}%
                </span>
            </div>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-amber-600 transition-all duration-500"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </Card>
    );
}

export default ReadingGoalCard;