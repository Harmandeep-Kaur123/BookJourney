import { BookOpen } from "lucide-react";

function AuthCard({ title, subtitle, children,}) {
    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-8 text-center">
                <BookOpen
                    size={40}
                    className="mx-auto text-amber-600"
                />

                <h1 className="mt-4 text-2xl font-bold text-gray-900">
                    BookJourney
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Remember what you read
                </p>

                <h2 className="mt-6 text-xl font-semibold">
                    {title}
                </h2>

                {subtitle && (
                    <p className="mt-2 text-sm text-gray-500">
                        {subtitle}
                    </p>
                )}
            </div>

            {children}
        </div>
    );
}

export default AuthCard;