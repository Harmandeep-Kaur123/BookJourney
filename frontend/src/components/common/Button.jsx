function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className = "",
}) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50";

    const variants = {
        primary:
            "bg-amber-600 text-white hover:bg-amber-700",

        secondary:
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",

        danger:
            "bg-red-600 text-white hover:bg-red-700",

        ghost:
            "text-gray-700 hover:bg-gray-100",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;