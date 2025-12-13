"use server";

import { getAuthToken } from "@/lib/actions/auth";
import { ApiResponse, Product } from "@/types";
import {serverEnv} from "@/data/env";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getProducts(
  query: Record<string, string>
): Promise<ApiResponse<{
    products: Product[];
}>|null> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  const token = await getAuthToken();

  try {
    const url = `${API_BASE_URL}/vendor/products${queryString}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}
