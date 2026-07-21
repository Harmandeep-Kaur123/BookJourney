import PageHeader from "../layout/PageHeader";
function DashboardHeader({ name }) {
    return (
        <PageHeader
            title={`Welcome back, ${name} 👋`}
            description="Remember what you read. Track your progress and revisit your knowledge."
        />
    );
}

export default DashboardHeader;