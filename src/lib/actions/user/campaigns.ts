// lib/actions/user/hotSale.ts
import { ApiResponse } from "@/types";
import {clientEnv} from "@/data/env";

export interface HotProduct {
    id: string;
    title: string;
    slug: string;
    original_price: number;
    price: number;
    discount: number;
    image: string;
    rating: number;
    sold: number;
    available: number;
    offerEnds: string;
    totalStock: number;
    campaign_id?: string;
    campaign_name?: string;
}

const API_BASE_URL = clientEnv.NEXT_PUBLIC_API_BASE_URL;

export async function getHotSaleProductsByDiscount(discount: string): Promise<ApiResponse<HotProduct[]>> {
    try {
        const url = `${API_BASE_URL}/user/hot-sale-products/${discount}`;
        const response = await fetch(url, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                status: "error",
                message: result.message || `Failed to fetch hot sale products (${response.status})`,
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

        // Map data to match HotProduct interface
        const mappedData: HotProduct[] = result.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            original_price: item.original_price,
            price: item.price,
            discount: item.discount,
            image: item.image,
            rating: item.rating,
            sold: item.sold,
            available: item.available,
            offerEnds: item.offerEnds,
            totalStock: item.totalStock,
            campaign_id: item.campaign_id,
            campaign_name: item.campaign_name,
        }));

        return {
            status: "success",
            data: mappedData,
            message: result.message || "Hot sale products fetched successfully",
        };

    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to fetch hot sale products",
            data: null,
        };
    }
}