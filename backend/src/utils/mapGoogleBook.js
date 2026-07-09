const mapGoogleBook = (book) => {
    const volumeInfo = book.volumeInfo || {};
    //Data transformation
    return {
        googleBookId: book.id,
        title: volumeInfo.title || "",
        authors: volumeInfo.authors || [],
        description: volumeInfo.description || "",
        coverImage:volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || "",
        pageCount: volumeInfo.pageCount || 0,
        categories: volumeInfo.categories || [],
        publisher: volumeInfo.publisher || "",
        publishedDate: volumeInfo.publishedDate || "",
    };
};

export default mapGoogleBook;