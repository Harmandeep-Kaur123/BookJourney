import { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ReadingGoalCard from "../../components/dashboard/ReadingGoalCard";
import ContinueReading from "../../components/dashboard/ContinueReading";
import FavoriteGenres from "../../components/dashboard/FavGenreCard";
import RecentNotes from "../../components/dashboard/RecentNotes";

import dashboardService from "../../services/dashboard.service";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useAuth } from "../../context/AuthContext";


function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        stats: {
            wantToRead: 0,
            reading: 0,
            completed: 0,
            pagesRead: 0,
            averageRating: 0,
        },
        readingGoal: {
            target: 0,
            completed: 0,
            progress: 0,
        },
        favoriteGenres: [],
        continueReading: [],
        recentNotes: [],
    });
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    useEffect(() => {
        fetchDashboard();
    }, []);

    async function fetchDashboard() {
        try {
            const response = await dashboardService.getDashboard();

            setDashboardData(response.data);
        } catch (error) {
            console.error(error);

            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <LoadingSpinner
                fullScreen
                message="Loading dashboard..."
            />
        );
    }

    return (
        <PageContainer>
            

            <DashboardHeader
                name={user.name}
            />

            <StatsGrid
                stats={dashboardData.stats}
            />

            <ContinueReading
                books={dashboardData.continueReading}
            />

            <ReadingGoalCard
                goal={dashboardData.readingGoal}
            />

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <FavoriteGenres
                    genres={dashboardData.favoriteGenres}
                />

                <RecentNotes
                    notes={dashboardData.recentNotes}
                />
            </div>
        </PageContainer>
    );
    // return (
    //     <PageContainer>
    //         <DashboardHeader name={dashboardData.user.name} />
    //         <StatsGrid stats={dashboardData.stats}/>
    //         <ReadingGoalCard goal={dashboardData.goal} />
    //         <ContinueReading books={dashboardData.continueReading} />
    //         <div className="mt-8 grid gap-8 lg:grid-cols-2">
    //             <FavoriteGenres genres={dashboardData.genres}/>
    //             <RecentNotes notes={dashboardData.notes}/>
    //         </div>
    //     </PageContainer>
    // );
}

export default Dashboard;
