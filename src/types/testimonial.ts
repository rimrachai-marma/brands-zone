import { PaginationMeta } from "@/types/index";

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  designation?: string;
  avatar?: string;
  avatar_url?: string;
  message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
  pagination: PaginationMeta;
}

export interface CreateTestimonialData {
  name: string;
  rating: number;
  message: string;
  designation?: string;
  avatar?: File | string;
  is_active: boolean;
}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {}
