import Card from "../common/Card" 

function StatCard({
    title,
    value,
    icon: Icon,
    iconColor = "text-amber-600",
}) {
    return (
        <Card className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {value}
                </h2>
            </div>

            {Icon && (
                <div
                    className={`rounded-full bg-gray-100 p-3 ${iconColor}`}
                >
                    <Icon size={26} />
                </div>
            )}
        </Card>
    );
}

export default StatCard;