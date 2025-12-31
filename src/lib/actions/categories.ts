// lib/api/category.ts
import { ApiResponse, Category } from "@/types";
import { getAuthToken } from "@/lib/actions/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetCategoriesParams {
  page?: number;
  per_page?: number;
  root_only?: true | 1 | false | 0;
  with_children?: true | 1 | false | 0;
  with_parent?: true | 1 | false | 0;
  with_products_count?: true | 1 | false | 0;
  keyword?: string;
  sort?: "name" | "created_at" | "updated_at";
  order?: "asc" | "desc";
}

export async function getCategories(
  params: GetCategoriesParams = {}
): Promise<ApiResponse<Category[]>> {
  const queryParams = new URLSearchParams();
  const token = await getAuthToken();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/categories?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategoryBySlug(
  slug: string,
  options?: {
    with_children?: boolean;
    with_parent?: boolean;
    with_products?: boolean;
  }
): Promise<ApiResponse<{ category: Category }>> {
  const queryParams = new URLSearchParams();
  const token = await getAuthToken();
  Object.entries(options || {}).forEach(([key, value]) => {
    queryParams.append(key, value.toString());
  });

  const response = await fetch(
    `${API_BASE_URL}/categories/${slug}?${queryParams}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function createCategory(
  data: Omit<Category, "id" | "created_at" | "updated_at">
): Promise<ApiResponse<{ category: Category }>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create category");
  }

  return response.json();
}

export async function updateCategory(
  slug: string,
  data: Partial<Omit<Category, "id" | "slug" | "created_at" | "updated_at">>
): Promise<ApiResponse<{ updated_category: Category }>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update category");
  }

  return response.json();
}

export async function deleteCategory(
  slug: string
): Promise<ApiResponse<{ deletedCategory: Category }>> {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete category");
  }

  return response.json();
}

export async function toggleCategoryStatus(
  slug: string
): Promise<ApiResponse<{ category: Category }>> {
  const token = await getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/categories/${slug}/toggle-status`,
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

export async function getCategoryTree(): Promise<ApiResponse<Category[]>> {
  const response = await fetch(`${API_BASE_URL}/categories/tree`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
