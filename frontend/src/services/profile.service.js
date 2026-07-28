import apiClient from "../api/apiClient";

export const getProfile = async () => {
    const response = await apiClient.get("/auth/me");
    return response.data.data;
};

export const updateProfile = async (data) => {
    const response = await apiClient.put(
        "/auth/profile",
        data
    );

    return response.data;
};

export const changePassword = async (data) => {
    const response = await apiClient.put(
        "/auth/change-password",
        data
    );

    return response.data;
};