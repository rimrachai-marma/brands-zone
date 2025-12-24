"use server";

import { ApiResponse } from "@/types";
import { serverEnv } from "@/data/env";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export type FeaturedBrand = {
  id: number;
  shop_name: string;
  slug: string;
  logo: string | null;
};

export async function getFeaturedBrands(): Promise<
  ApiResponse<FeaturedBrand[]>
> {
  try {
    const url = `${API_BASE_URL}/user/vendors/featured`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch brands",
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
