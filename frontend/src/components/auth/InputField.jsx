function InputField({
    id,
    label,
    type = "text",
    placeholder,
    registration,
    error,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...registration}
                className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                    error
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-amber-500"
                }`}
            />

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
}

export default InputField;