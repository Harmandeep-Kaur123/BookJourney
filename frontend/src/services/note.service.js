import apiClient from "../api/apiClient";

const noteService = {
    async getNotes(userBookId) {
        const response = await apiClient.get("/notes", {
            params: {
                userBookId,
            },
        });

        return response.data;
    },

    async createNote(data) {
        const response = await apiClient.post(
            "/notes",
            data
        );

        return response.data;
    },

    async updateNote(noteId, data) {
        const response = await apiClient.patch(
            `/notes/${noteId}`,
            data
        );

        return response.data;
    },

    async deleteNote(noteId) {
        const response = await apiClient.delete(
            `/notes/${noteId}`
        );

        return response.data;
    },
};

export default noteService;