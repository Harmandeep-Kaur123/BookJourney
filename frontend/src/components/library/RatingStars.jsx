// import { Star } from "lucide-react";

// function RatingStars({ rating }) {
//     return (
//         <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                     key={star}
//                     size={18}
//                     className={
//                         star <= (rating || 0)
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                     }
//                 />
//             ))}
//         </div>
//     );
// }

// export default RatingStars;

import { Star } from "lucide-react";

function RatingStars({
    rating = 0,
    onChange,
    size = 20,
}) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => {
                const active = value <= rating;

                return (
                    <button
                        key={value}
                        type="button"
                        disabled={!onChange}
                        onClick={() => onChange?.(value)}
                        className={`transition-transform ${
                            onChange
                                ? "cursor-pointer hover:scale-110"
                                : "cursor-default"
                        }`}
                    >
                        <Star
                            size={size}
                            className={
                                active
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    </button>
                );
            })}
        </div>
    );
}

export default RatingStars;