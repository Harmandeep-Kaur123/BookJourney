import { useEffect } from "react";
import { LogOut } from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import PageHeader from "../components/layout/PageHeader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";

import ProfileInfoCard from "../components/profile/ProfileInfoCard";
import ReadingGoalCard from "../components/profile/ReadingGoalCard";
import ChangePasswordCard from "../components/profile/ChangePasswordCard";

import useProfile from "../hooks/useProfile";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const {
        profile,
        loading,
        fetchProfile,
        saveProfile,
        updatePassword,
    } = useProfile();

    const { logout } = useAuth();
    const { updateUser } = useAuth();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading || !profile) {
        return (
            <LoadingSpinner message="Loading profile..." />
        );
    }

    return (
        <PageContainer>
            <PageHeader
                title="Profile"
                description="Manage your account settings."
            />

            <div className="space-y-6">
                <ProfileInfoCard
                    profile={profile}
                    onSave={saveProfile}
                />

                <ReadingGoalCard
                    profile={profile}
                    onSave={saveProfile}
                />

                <ChangePasswordCard
                    onChangePassword={
                        updatePassword
                    }
                />

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-2 text-xl font-semibold">
                        Account
                    </h2>

                    <p className="mb-6 text-sm text-gray-600">
                        Sign out from your account.
                    </p>

                    <Button
                        variant="danger"
                        onClick={logout}
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}

export default Profile;