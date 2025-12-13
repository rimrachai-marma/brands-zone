import {ApiResponse, UserProduct} from "@/types";
import {clientEnv} from "@/data/env";

type Category = {
    id: string;
    name: string;
    slug: string;
}

type ApiResult = {
    success: boolean;
    data: Category[];
    message?: string;
}

const API_BASE_URL = clientEnv.NEXT_PUBLIC_API_BASE_URL;


export async function getUserTopCategories(): Promise<ApiResponse<Category[]>> {
    try {
        const url = `${API_BASE_URL}/user/top-categories`;
        const response = await fetch(url);

        const result: ApiResult = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message: result.message || `Failed to fetch categories (${response.status})`,
                data: null,
            };
        }

        if (!result.success || !Array.isArray(result.data)) {
            return {
                status: "error",
                message: result.message || "Invalid API response format",
                data: null,
            };
        }

        // ✅ Wrap the data in ApiResponse
        return {
            status: "success",
            data: result.data,
            message: result.message || "Categories fetched successfully",
        };

    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch categories",
            data: null,
        };
    }
}


export async function getUserTopCategoryProducts({slug}: { slug?: string | null }): Promise<ApiResponse<UserProduct[]>> {
    try {
        const url = `${API_BASE_URL}/user/categories/${slug}/products`;
        const response = await fetch(url);

        const result = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message: result.message || `Failed to fetch products (${response.status})`,
                data: null,
            };
        }

        if (!result.success || !Array.isArray(result.data)) {
            return {
                status: "error",
                message: result.message || "Invalid API response format",
                data: null,
            };
        }

        // ✅ Wrap the data in ApiResponse
        return {
            status: "success",
            data: result.data,
            message: result.message || "Products fetched successfully",
        };

    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch products",
            data: null,
        };
    }
}