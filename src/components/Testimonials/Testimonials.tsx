import React from "react";

import { getTestimonials } from "@/lib/actions/testimonial";
import TestimonialCarousel from "./TestimonialCarousel";

const TestimonialSlider = async () => {
  const result = await getTestimonials();

  return (
    <section className="pb-20">
      <div className=" mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Stories
          </h2>
          <p className="text-gray-600 text-lg">
            Real experiences from real customers
          </p>
        </div>

        <TestimonialCarousel testimonials={result.data ?? []} />
      </div>
    </section>
  );
};

export default TestimonialSlider;
