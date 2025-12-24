// lib/api/category.ts
import {ApiResponse, Categories, Category, CategoryTree} from "@/types";
import {getAuthToken} from "@/lib/actions/auth";

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
    const token = await getAuthToken();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });

    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories?${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

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
    const token = await getAuthToken();

    Object.entries(options || {}).forEach(([key, value]) => {
        queryParams.append(key, value.toString());
    });

    const response = await fetch(
        `${API_BASE_URL}/categories/${slug}?${queryParams}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

export async function createCategory(
    data: FormData
): Promise<ApiResponse<{ category: Category }>> {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data,
    });

    return response.json();
}

export async function updateCategory(
    id: string,
    data: FormData
): Promise<ApiResponse<{ updated_category: Category }>> {
    const token = await getAuthToken();
data.append('_method', 'PATCH');
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            // Don't set Content-Type - let browser set it with boundary for multipart/form-data
        },
        body: data,
    });

    return response.json();
}

export async function deleteCategory(
    slug: string |undefined
): Promise<ApiResponse<{ deletedCategory: Category }>> {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/admin/categories/${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function toggleCategoryStatus(
    slug: string
): Promise<ApiResponse<{ category: Category }>> {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/categories/${slug}/toggle-status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to toggle status');
    }

    return response.json();
}

export async function getCategoryTree(): Promise<ApiResponse<CategoryTree>> {
    const token = await getAuthToken();

    const response = await fetch(`${API_BASE_URL}/categories/tree`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}