import apiClient from "../api/apiClient";
import { API } from "../constants/api";

const authService = {
    async register(userData) {
        const response = await apiClient.post(
            API.AUTH.REGISTER,
            userData
        );

        return response.data;
    },

    async login(credentials) {
        const response = await apiClient.post(
            API.AUTH.LOGIN,
            credentials
        );

        return response.data;
    },

    async getCurrentUser() {
        const response = await apiClient.get(
            API.AUTH.ME
        );

        return response.data;
    },
};
//axios returns response that contains data 
export default authService;