import {
    BookOpen,
    BookMarked,
    CircleCheckBig,
    FileText,
    Star,
} from "lucide-react";

import StatCard from "./StatCard";

function StatsGrid({ stats }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <StatCard
                title="Want to Read"
                value={stats.wantToRead}
                icon={BookMarked}
            />

            <StatCard
                title="Reading"
                value={stats.reading}
                icon={BookOpen}
            />

            <StatCard
                title="Completed"
                value={stats.completed}
                icon={CircleCheckBig}
            />

            <StatCard
                title="Pages Read"
                value={stats.pagesRead}
                icon={FileText}
            />

            <StatCard
                title="Avg Rating"
                value={stats.averageRating}
                icon={Star}
            />
        </div>
    );
}

export default StatsGrid;