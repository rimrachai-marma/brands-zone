"use server";

import {
  BankingInfoData,
  BusinessInfoData,
  ShopInfoData,
} from "@/app/(pages)/(vandor)/brands/profile/_lib/schemas";
import { serverEnv } from "@/data/env";
import { getAuthToken } from "@/lib/actions/auth";
import { ActionState, ApiResponse, ErrorData, PaginationMeta } from "@/types";
import {
  PublicVendor,
  StatusState,
  Vendor,
  VendorRating,
  VendorStats,
} from "@/types/vendor";
import { log } from "console";
import { redirect } from "next/navigation";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function register(
  state: ActionState<{ vandor: Vendor }, ErrorData> | null,
  formData: FormData
): Promise<ActionState<{ vandor: Vendor }, ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shop_name: formData.get("shop_name"),
        description: formData.get("description"),
        business_type: formData.get("business_type"),
        business_address: formData.get("business_address"),
        business_email: formData.get("business_email"),
        business_phone: formData.get("business_phone"),
        business_registration_number: formData.get(
          "business_registration_number"
        ),
        tax_id: formData.get("tax_id"),
        years_in_business: formData.get("years_in_business"),
        bank_account_name: formData.get("bank_account_name"),
        bank_name: formData.get("bank_name"),
        bank_account_number: formData.get("bank_account_number"),
        bank_routing_number: formData.get("bank_routing_number"),
        bank_swift_code: formData.get("bank_swift_code"),

        ...(formData.get("bank_swift_code") && {
          bank_swift_code: formData.get("bank_swift_code"),
        }),

        ...(formData.get("bank_routing_number") && {
          bank_routing_number: formData.get("bank_routing_number"),
        }),

        ...(formData.get("website_url") && {
          website_url: formData.get("website_url"),
        }),
      }),
    });

    return await response.json();
  } catch (error) {
    log("Error registering vendor:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function verfy() {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE_URL}/vendor/verify/start`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    redirect((await response.json()).data?.verification_url);
  }
}

export async function getVendorProfile(): Promise<
  ApiResponse<{
    vendor: Vendor;
    rating: VendorRating;
    stats: VendorStats;
    status_state: StatusState;
  }>
> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/vendor/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    log("Error fetching vendor profile:", error);

    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function getVendorProfileById(id: string): Promise<
  ApiResponse<{
    vendor: Vendor;
    rating: VendorRating;
    stats: VendorStats;
    status_state: StatusState;
  }>
> {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    log("Error fetching vendor profile:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function updateCover(
  state: ActionState<{ vandor: Vendor }, ErrorData> | null,
  formData: { banner: string }
): Promise<ActionState<{ vandor: Vendor }, ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/profile/update-cover`,
      {
        method: "Put",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    return await response.json();
  } catch (error) {
    log("Error updating vendor:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function updateAvatar(
  state: ActionState<{ vandor: Vendor }, ErrorData> | null,
  formData: { logo: string }
): Promise<ActionState<{ vandor: Vendor }, ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/profile/update-logo`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    log("Error updating vendor:", error);
    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export default async function update(
  state: ActionState<{ vendor: Vendor }, ErrorData> | null,
  data: ShopInfoData | BankingInfoData | BusinessInfoData
): Promise<ActionState<
  {
    vendor: Vendor;
  },
  ErrorData
> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/vendor/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getVendors(query: Record<string, string>): Promise<
  ApiResponse<{
    vendors: (PublicVendor & {
      rating: VendorRating;
      stats: Omit<VendorStats, "years_in_business" | "verified_since">;
      status_state: StatusState;
    })[];
    pagination: PaginationMeta;
  }>
> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/vendors${queryString}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch products",
        data: null,
      };
    }

    return result;
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}
