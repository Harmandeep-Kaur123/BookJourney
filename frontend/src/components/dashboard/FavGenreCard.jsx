import Card from "../common/Card";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";
import { Tags, BookMarked } from "lucide-react";

function FavoriteGenres({ genres }) {
    return (
        <Card title="Favorite Genres">
            {genres.length === 0 ? (
                <EmptyState
                    icon={Tags}
                    title="No genres yet"
                    description="Complete a few books to discover your favorite genres."
                />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {genres.map((genre) => (
                        <div
                            key={genre}
                            className="flex items-center gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 transition hover:border-amber-300 hover:bg-amber-100"
                        >
                            <div className="rounded-lg bg-white p-2 text-amber-600">
                                <BookMarked size={18} />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Genre
                                </p>

                                <h3 className="font-medium text-gray-900">
                                    {genre}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
}

export default FavoriteGenres;