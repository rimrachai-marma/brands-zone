import { PaginationMeta } from ".";

export interface Campaign {
  id: string; // UUID
  name: string;
  slug: string;
  description?: string;
  banner_image?: string;
  discount_percentage: number; // Decimal (e.g., 20.00 for 20%)
  starts_at: string;
  ends_at: string;
  is_active: boolean;
  badge_text?: string; // e.g., "SALE", "BLACK FRIDAY"
  badge_color?: string; // Hex color
  created_at: string;
  updated_at: string;
  products_count?: number;
}

export interface CampaignStatistics {
  total_products: number;
  active_products: number;
  days_remaining: number;
  is_ongoing: boolean;
}

export interface Campaigns {
  campaigns: Campaign[];
  pagination: PaginationMeta;
}
