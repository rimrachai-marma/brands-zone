import { Star, StarHalf } from "lucide-react";

interface Props {
  rating: number;
  size?: string;
}

const Rating: React.FC<Props> = ({ rating, size = "w-4 h-4" }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalf = i === Math.floor(rating) && rating % 1 !== 0;

        if (isHalf) {
          return (
            <StarHalf
              key={i}
              className={`${size} fill-yellow-400 text-yellow-400 stroke-yellow-400`}
            />
          );
        }

        return (
          <Star
            key={i}
            className={`${size} ${
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Rating;
