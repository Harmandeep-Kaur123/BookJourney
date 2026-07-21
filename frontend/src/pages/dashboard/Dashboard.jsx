import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ReadingGoalCard from "../../components/dashboard/ReadingGoalCard";
import ContinueReading from "../../components/dashboard/ContinueReading";
import FavoriteGenres from "../../components/dashboard/FavGenreCard";
import RecentNotes from "../../components/dashboard/RecentNotes";

import { dashboardData } from "../../data/dashboard";
function Dashboard() {
    return (
        <PageContainer>
            <DashboardHeader name={dashboardData.user.name} />
            <StatsGrid stats={dashboardData.stats}/>
            <ReadingGoalCard goal={dashboardData.goal} />
            <ContinueReading books={dashboardData.continueReading} />
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <FavoriteGenres genres={dashboardData.genres}/>
                <RecentNotes notes={dashboardData.notes}/>
            </div>
        </PageContainer>
    );
}

export default Dashboard;
