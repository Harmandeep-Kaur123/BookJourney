import apiClient from "../api/apiClient";

const bookService = {
    async searchBooks(query) {
        const response = await apiClient.get("/books/search", {
            params: {
                q: query,
            },
        });

        return response.data;
    },

    async getBookDetails(googleBookId) {
        const response = await apiClient.get(`/books/${googleBookId}`);

        return response.data;
    },

    async getLibrary() {
        const response = await apiClient.get(
            "/books/library"
        );

        return response.data;
    },

    async addToLibrary(googleBookId) {
        const response = await apiClient.post("/books", {
            googleBookId,
        });

        return response.data;
    },

    async updateLibraryBook(userBookId, data) {
        const response = await apiClient.patch(
            `/books/library/${userBookId}`,
            data
        );

        return response.data;
    },
};

export default bookService;