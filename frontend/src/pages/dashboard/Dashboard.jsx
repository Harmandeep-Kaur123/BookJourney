import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

function Dashboard() {
    return (
        <PageContainer>
            <PageHeader
                title="Dashboard"
                description="Track your reading progress and insights."
            />

            <div className="rounded-xl border bg-white p-8">
                Dashboard content goes here.
            </div>
        </PageContainer>
    );
}

export default Dashboard;
