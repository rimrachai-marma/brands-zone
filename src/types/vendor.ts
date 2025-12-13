export interface Vendor {
  id: string;

  user_id: string;

  shop_name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;

  business_email?: string | null;
  business_phone?: string | null;
  business_address?: string | null;

  business_registration_number?: string | null;
  tax_id?: string | null;
  business_type?:
    | "sole_proprietorship"
    | "partnership"
    | "corporation"
    | "llc"
    | null;
  years_in_business?: number | null;
  website_url?: string | null;

  bank_name?: string | null;
  bank_account_name?: string | null;
  bank_account_number?: string | null;
  bank_routing_number?: string | null;
  bank_swift_code?: string | null;

  commission_rate: number;
  status: "pending" | "verified" | "suspended" | "rejected";

  rejection_reason?: string | null;

  didit_session_id?: string | null;
  didit_verification_url?: string | null;
  submitted_at?: string | null;
  verified_at?: string | null;

  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface VendorRating {
  average: number;
  total_reviews: number;
  positive_percentage: number;
}

export interface VendorStats {
  products_sold: number;
  avg_ship_time: string | null;
  products_count: number;
  years_in_business: number;
  verified_since: string;
}

export type StatusState = string;
