import {
  Testimonial,
  CreateTestimonialData,
  UpdateTestimonialData,
} from "@/types/testimonial";
import { ApiResponse } from "@/types";
import { getAuthToken } from "@/lib/actions/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetTestimonialsParams {
  page?: number;
  per_page?: number;
  is_active?: boolean;
  search?: string;
  sort?: "created_at" | "updated_at" | "rating" | "name";
  order?: "asc" | "desc";
}

export async function getTestimonials(
  params: GetTestimonialsParams = {}
): Promise<ApiResponse<Testimonial[]>> {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "all") {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(
      `${API_BASE_URL}/testimonials?${queryParams}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}


export async function getAdminTestimonials(
    params: GetTestimonialsParams = {}
): Promise<ApiResponse<Testimonial[]>> {
  const queryParams = new URLSearchParams();
  const token =await getAuthToken();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "all") {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(
        `${API_BASE_URL}/admin/testimonials?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}



export async function getTestimonialById(
  id: string
): Promise<ApiResponse<{ testimonial: Testimonial }>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

function extracted(
  data: CreateTestimonialData | UpdateTestimonialData
): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "avatar") return;

    if (key === "is_active") {
      formData.append("is_active", value ? "1" : "0");
    } else {
      formData.append(key, String(value));
    }
  });

  if ("avatar" in data && data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }

  return formData;
}

export async function createTestimonial(
  data: CreateTestimonialData
): Promise<ApiResponse<{ testimonial: Testimonial }>> {
  const formData: FormData = extracted(data);
  const token = await getAuthToken();
  const response: Response = await fetch(`${API_BASE_URL}/admin/testimonials`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialData
): Promise<ApiResponse<{ testimonial: Testimonial }>> {
  const formData: FormData = extracted(data);
  const token = await getAuthToken();
  formData.append('_method', 'PUT');
  const response: Response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
}

export async function deleteTestimonial(
  id: string
): Promise<ApiResponse<{ message: string }>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/admin/testimonials/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete testimonials");
  }

  return response.json();
}

export async function toggleTestimonialStatus(
  id: string
): Promise<ApiResponse<{ testimonial: Testimonial }>> {
  const token = await getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/admin/testimonials/${id}/toggle-status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to toggle status");
  }

  return response.json();
}
