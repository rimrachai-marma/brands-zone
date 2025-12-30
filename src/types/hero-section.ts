// types/hero-section.ts
export interface HeroSection {
    id: number;
    title?: string | null;
    subtitle?: string | null;
    cta_text?: string | null;
    cta_link?: string | null;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    full_image_1?: string;
    full_image_2?: string;
    full_image_3?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface HeroSectionResponse {
    success: boolean;
    data: HeroSection;
    message: string;
}

export interface HeroSectionListResponse {
    success: boolean;
    data: HeroSection[];
    message: string;
    pagination?: {
        page: number;
        pages: number;
        per_page: number;
        total: number;
    };
}

export interface PaginationMeta {
    page: number;
    pages: number;
    per_page: number;
    total: number;
}