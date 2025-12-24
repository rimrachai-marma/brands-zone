"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, User } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
import Rating from "../common/Rating";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  designation?: string;
  avatar?: string;
  avatar_url?: string;
  message: string;
}

interface Props {
  testimonials: Testimonial[];
}

const TestimonialCarousel: React.FC<Props> = ({ testimonials }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", updateCurrent);
    updateCurrent();

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      api.off("select", updateCurrent);
    };
  }, [api]);

  const totalSlides = Math.ceil(testimonials.length / 3);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full rounded-2xl">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                      {testimonial.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={testimonial.avatar_url}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-700" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      {testimonial.designation && (
                        <p className="text-sm text-muted-foreground">
                          {testimonial.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    <Rating rating={testimonial.rating} size="w-3.5 h-3.5" />
                  </div>

                  <div className="text-muted-foreground grow italic">
                    <Quote />
                    <span>{testimonial.message}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index * 3)}
            className={`h-2 rounded-full transition-all ${
              Math.floor(current / 3) === index
                ? "w-8 bg-primary"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
