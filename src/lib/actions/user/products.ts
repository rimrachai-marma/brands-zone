import {ApiResponse, CategoryMini, UserProduct} from "@/types";
import {clientEnv} from "@/data/env";

type ApiResult = {
    success: boolean;
    data: CategoryMini[];
    message?: string;
};

const API_BASE_URL = clientEnv.NEXT_PUBLIC_API_BASE_URL;

export async function getUserTopCategories({
                                               limit = 4,
                                               is_random = false,
                                           }: {
    limit?: number;
    is_random?: boolean;
}): Promise<ApiResponse<CategoryMini[]>> {
    try {
        const params = new URLSearchParams();

        if (limit) {
            params.append("limit", limit.toString());
        }

        if (is_random) {
            params.append("is_random", String(is_random));
        }

        const url = `${API_BASE_URL}/user/top-categories?${params.toString()}`;
        const response = await fetch(url);

        const result: ApiResult = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message:
                    result.message || `Failed to fetch categories (${response.status})`,
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
            message:
                error instanceof Error ? error.message : "Failed to fetch categories",
            data: null,
        };
    }
}

export async function getUserTopCategoryProducts({
                                                     slug,
                                                 }: {
    slug?: string | null;
}): Promise<ApiResponse<UserProduct[]>> {

    try {
        const url = `${API_BASE_URL}/user/categories/${slug}/products`;
        const response = await fetch(url);

        const result = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message:
                    result.message || `Failed to fetch products (${response.status})`,
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
            message:
                error instanceof Error ? error.message : "Failed to fetch products",
            data: null,
        };
    }
}


export async function getUserRandomProducts({limit, is_random, is_new,brand_id}: {
    limit?: string | null;
    is_random?: boolean | null;
    is_new: boolean | null;
    brand_id?: string | undefined;
}):
    Promise<ApiResponse<UserProduct[]>> {
    try {
        const params = new URLSearchParams();

        if (limit) {
            params.append("limit", limit.toString());
        }

        if (is_random) {
            params.append("is_random", String(is_random));
        }

        if (is_new) {
            params.append("is_new", String(is_new));
        }

        if (brand_id) {
            params.append("brand_id", brand_id);
        }

        const url = `${API_BASE_URL}/user/random/products?${params.toString()}`;
        const response = await fetch(url);

        const result = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message:
                    result.message || `Failed to fetch products (${response.status})`,
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
            message:
                error instanceof Error ? error.message : "Failed to fetch products",
            data: null,
        };
    }
}
