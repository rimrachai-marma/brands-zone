"use server";

import {ProductRequest, ProductRequestPagination} from "@/types/admin"
import {serverEnv} from "@/data/env";
import {getAuthToken} from "@/lib/actions/auth";
export interface ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data: T | null;
    pagination?: ProductRequestPagination;
}
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getProductRequests(
    query: Record<string, string>
): Promise<ApiResponse<ProductRequest[]>> {
    try {
        const token = await getAuthToken();

        // ✅ build query string safely
        const params = new URLSearchParams(query).toString();
        const url = `${API_BASE_URL}/admin/products/request${params ? `?${params}` : ""}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message: result.message || "Failed to fetch product requests",
                data: null,
            };
        }

        return result;
    } catch (error) {
        return {
            status: "error",
            message:
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred",
            data: null,
        };
    }
}


    export async function approveProduct(
        productId: string,

    ): Promise<ApiResponse<null>> {
        try {
            const token = await getAuthToken();

            const response = await fetch(
                `${API_BASE_URL}/admin/products/approve`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        product_id: productId,
                    }),
                }
            );

            return await response.json();
        } catch (error) {
            return {
                status: "error",
                message:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
                data: null,
            };
        }
    }
