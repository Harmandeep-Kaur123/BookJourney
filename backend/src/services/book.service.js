import axios from "axios";

export const searchBooks = async (query) => {
    try {
        const response = await axios.get(
            `${process.env.GOOGLE_BOOKS_API_URL}/volumes`,
            {
                params: {
                    q: `intitle:${query}`,
                    maxResults: 3,
                    langRestrict:"en",
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                },
            }
        );

        //const books = response.data.items || [];
        const books = (response.data.items || []).filter((book) => book.volumeInfo.language === "en");  //only english for now
        return books.map((book) => ({
            googleBookId: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            description: book.volumeInfo.description || "",
            coverImage: book.volumeInfo.imageLinks?.thumbnail || "",
            pageCount: book.volumeInfo.pageCount || 0,
            categories: book.volumeInfo.categories || [],
            publisher: book.volumeInfo.publisher || "",
            publishedDate: book.volumeInfo.publishedDate || "",
        }));
    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        throw error;
    }
};