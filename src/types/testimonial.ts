
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


export interface CreateTestimonialData {
  name: string;
  rating: number;
  message: string;
  designation?: string;
  avatar?: File | string;
  is_active: boolean;
}

export type UpdateTestimonialData = Partial<CreateTestimonialData>
