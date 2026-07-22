function BookCover({
    src,
    alt,
    className = "",
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={`rounded-lg object-cover shadow ${className}`}
        />
    );
}

export default BookCover;