// lib/api/hero-section.ts
"use client"
import {HeroSectionListResponse, HeroSectionResponse,} from "@/types/hero-section";
import {getAuthToken} from "./auth";
import {clientEnv} from "@/data/env";

const API_BASE_URL = clientEnv.NEXT_PUBLIC_API_BASE_URL;

interface GetHeroSectionsParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
}

export async function getHeroSections(
    params: GetHeroSectionsParams = {}
): Promise<HeroSectionListResponse> {
    const { page = 1, limit = 5, search, sort } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    if (search) queryParams.append("search", search);
    if (sort) queryParams.append("sort", sort);

    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section/?${queryParams}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching hero sections:", error);
        return {
            success: false,
            data: [],
            message: error instanceof Error ? error.message : "Failed to fetch hero sections",
        };
    }
}

export async function getHeroSection(id: number): Promise<HeroSectionResponse> {
    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section/${id}`;

        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching hero section:", error);
        return {
            success: false,
            data: {} as any,
            message: error instanceof Error ? error.message : "Failed to fetch hero section",
        };
    }
}

export async function createHeroSection(
    formData: FormData
): Promise<HeroSectionResponse> {
    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await response.json(); // একবার read

        return data;
    } catch (error) {
        console.error("Error creating hero section:", error);
        return {
            success: false,
            data: {} as any,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create hero section",
        };
    }
}


export async function updateHeroSection(
    id: number,
    formData: FormData
): Promise<HeroSectionResponse> {
    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section`;

        // Add id to form data for PATCH request
        formData.append("_method", "PATCH");

        const response = await fetch(`${url}?id=${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating hero section:", error);
        return {
            success: false,
            data: {} as any,
            message: error instanceof Error ? error.message : "Failed to update hero section",
        };
    }
}

export async function deleteHeroSection(id: number): Promise<{ success: boolean; message: string }> {
    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section/${id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        return await response.json();
    } catch (error) {
        console.error("Error deleting hero section:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete hero section",
        };
    }
}

export async function toggleHeroSectionStatus(id: number): Promise<HeroSectionResponse> {
    try {
        const token = await getAuthToken();
        const url = `${API_BASE_URL}/admin/hero-section/toggle-status/${id}`;

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Error toggling hero section status:", error);
        return {
            success: false,
            data: {} as any,
            message: error instanceof Error ? error.message : "Failed to toggle hero section status",
        };
    }
}