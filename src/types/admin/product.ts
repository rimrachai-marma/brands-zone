export interface ProductRequest {
    id: string;
    name: string;
    slug: string;
    brand_name: string;
    campaign_name: string | null;
    price: string;
    sale_price: string | null;
    cost_price: string;
    status: "pending" | "approved" | "rejected" | "draft";
    created_at: string;
    banner_image?: string;
}

export interface ProductRequestPagination {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}