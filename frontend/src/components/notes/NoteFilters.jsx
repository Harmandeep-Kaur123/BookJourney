import Button from "../common/Button";

const FILTERS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Notes",
        value: "note",
    },
    {
        label: "Quotes",
        value: "quote",
    },
];

function NoteFilters({
    filter,
    setFilter,
}) {
    return (
        <div className="mb-6 flex flex-wrap gap-3">
            {FILTERS.map((item) => (
                <Button
                    key={item.value}
                    variant={
                        filter === item.value
                            ? "primary"
                            : "secondary"
                    }
                    onClick={() =>
                        setFilter(item.value)
                    }
                >
                    {item.label}
                </Button>
            ))}
        </div>
    );
}

export default NoteFilters;