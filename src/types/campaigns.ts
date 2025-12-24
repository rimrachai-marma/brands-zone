import {PaginationMeta} from "@/types/index";

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description?: string;
  banner_image?: string;
  discount_percentage: number;
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  badge_text?: string;
  created_at: string;
  updated_at: string;
  products_count?: number;
  banner_image_url?: string;
}

export interface CampaignsResponse {
  data: Campaign[];
  pagination: PaginationMeta;
}

export interface CampaignResponse {
  data: Campaign;
  message: string;
  status: string;
}

export interface CampaignStatistics {
  total_products: number;
  active_products: number;
  days_remaining: number;
  is_ongoing: boolean;
}