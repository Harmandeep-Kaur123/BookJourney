import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as profileService from "../services/profile.service";

function useProfile() {

    const { updateUser } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);

        try {
            const data =
                await profileService.getProfile();

            setProfile(data);

            return data;
        } finally {
            setLoading(false);
        }
    }, []);

    const saveProfile = async (data) => {
        const response = await profileService.updateProfile(data);
        setProfile(response.data);
        updateUser(response.data);
        return response;
    };

    const updatePassword = async (data) => {
        return profileService.changePassword(data);
    };

    return {
        profile,
        loading,
        fetchProfile,
        saveProfile,
        updatePassword,
    };
}

export default useProfile;