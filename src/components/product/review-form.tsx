import React, { useState } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReviewFormData, reviewSchema } from "@/schema/review";
import { createReview } from "@/lib/actions/review";
import { LoadingSwap } from "../ui/loading-swap";
import { Alert, AlertDescription } from "../ui/alert";

interface Props {
  productId: string;
}

const ReviewForm: React.FC<Props> = ({ productId }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showAlert, setShowAlert] = useState(true);

  const [state, formAction, isPending] = React.useActionState(
    createReview,
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const currentRating = useWatch({
    control,
    name: "rating",
  });

  const comment = useWatch({
    control,
    name: "comment",
  });

  const handleStarClick = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  const handleFormSubmit = async (data: ReviewFormData) => {
    setShowAlert(true);
    React.startTransition(() => {
      formAction({ ...data, product_id: productId });
    });
  };

  React.useEffect(() => {
    if (state?.status) {
      reset({
        rating: 0,
        comment: "",
      });
      setShowAlert(true);

      // Auto-hide success message after 3 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state, reset]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
        <CardDescription>
          Share your experience with this product
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {state?.status === "error" && showAlert && (
          <Alert
            variant="destructive"
            className="bg-red-50 border border-red-200"
          >
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state?.status === "success" && showAlert && (
          <Alert className="bg-green-50 border border-green-200">
            <AlertDescription className="text-green-800">
              {state.message || "Review submitted successfully!"}
            </AlertDescription>
          </Alert>
        )}

        {/* Rating Input */}
        <div className="space-y-2">
          <Label htmlFor="rating">
            Your Rating <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 rounded"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || currentRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}

            {currentRating > 0 && (
              <span className="ml-2 text-sm font-medium text-gray-700">
                {currentRating} out of 5
              </span>
            )}
          </div>
          {errors.rating && (
            <p className="text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment Input */}
        <div className="space-y-2">
          <Label htmlFor="comment">
            Your Review <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <Textarea
                id="comment"
                {...field}
                rows={5}
                placeholder="Tell us about your experience with this product..."
                className="resize-none"
              />
            )}
          />
          <div className="flex justify-between items-center">
            {errors.comment ? (
              <p className="text-sm text-red-600">{errors.comment.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters required
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {comment?.length || 0}/1000
            </p>
          </div>
        </div>

        <Button
          disabled={isPending}
          type="button"
          onClick={handleSubmit(handleFormSubmit)}
        >
          <LoadingSwap isLoading={isPending}>Submit Review</LoadingSwap>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
