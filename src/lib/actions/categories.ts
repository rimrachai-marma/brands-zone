// lib/api/category.ts
import {ApiResponse, Categories, Category, CategoryTree} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetCategoriesParams {
  page?: number;
  per_page?: number;
  root_only?: boolean;
  with_children?: boolean;
  with_parent?: boolean;
  with_products_count?: boolean;
  keyword?: string;
  sort?: 'name' | 'created_at' | 'updated_at';
  order?: 'asc' | 'desc';
}

export async function getCategories(
    params: GetCategoriesParams = {}
): Promise<ApiResponse<Categories>> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(`${API_BASE_URL}/categories?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
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

  Object.entries(options || {}).forEach(([key, value]) => {
    queryParams.append(key, value.toString());
  });

  const response = await fetch(
      `${API_BASE_URL}/categories/${slug}?${queryParams}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function createCategory(
    data: Omit<Category, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<{ category: Category }>> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create category');
  }

  return response.json();
}

export async function updateCategory(
    slug: string,
    data: Partial<Omit<Category, 'id' | 'slug' | 'created_at' | 'updated_at'>>
): Promise<ApiResponse<{ updated_category: Category }>> {
  const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update category');
  }

  return response.json();
}

export async function deleteCategory(
    slug: string
): Promise<ApiResponse<{ deletedCategory: Category }>> {
  const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete category');
  }

  return response.json();
}

export async function toggleCategoryStatus(
    slug: string
): Promise<ApiResponse<{ category: Category }>> {
  const response = await fetch(`${API_BASE_URL}/categories/${slug}/toggle-status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to toggle status');
  }

  return response.json();
}

export async function getCategoryTree(): Promise<ApiResponse<CategoryTree>> {
  const response = await fetch(`${API_BASE_URL}/categories/tree`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
