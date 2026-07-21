import apiClient from "../api/apiClient";

export const getDashboard = async () => {
    const response = await apiClient.get("/dashboard");
    console.log("Response "+ JSON.stringify(response.data));
    return response.data;
};

const dashboardService = {
    getDashboard,
};

export default dashboardService;