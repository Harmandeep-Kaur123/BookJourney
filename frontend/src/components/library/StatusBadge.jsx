const STATUS_STYLES = {
    "Want to Read": "bg-slate-100 text-slate-700",
    "Reading": "bg-blue-100 text-blue-700",
    "Completed": "bg-green-100 text-green-700",
};

function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                STATUS_STYLES[status] ||
                "bg-gray-100 text-gray-700"
            }`}
        >
            {status}
        </span>
    );
}

export default StatusBadge;