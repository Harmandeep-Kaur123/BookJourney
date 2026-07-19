function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-white px-8 py-16 text-center">
            {Icon && (
                <Icon
                    size={48}
                    className="mb-4 text-gray-400"
                />
            )}

            <h2 className="text-xl font-semibold text-gray-900">
                {title}
            </h2>

            {description && (
                <p className="mt-2 max-w-md text-gray-500">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}

export default EmptyState;