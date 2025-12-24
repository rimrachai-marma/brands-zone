"use server";

import { ApiResponse } from "@/types";
import { Campaign } from "@/types/campaigns";
import { serverEnv } from "@/data/env";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getCampaigns(
  query: Record<string, string>
): Promise<ApiResponse<Campaign[]>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/campaigns${queryString}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch campaigns",
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
