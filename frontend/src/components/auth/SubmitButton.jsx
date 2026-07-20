function SubmitButton({
    loading,
    children,
}) {
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Please wait..." : children}
        </button>
    );
}

export default SubmitButton;