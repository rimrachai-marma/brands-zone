"use server";

import { serverEnv } from "@/data/env";
import { getAuthToken } from "@/lib/actions/auth";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export interface AdminBrand {
  id: string;
  shop_name: string;
  logo?: string;
  business_email?: string;
  business_phone?: string;
  status: string;
  business_type?: string;
  created_at: string;
}

export interface PaginatedBrands {
  data: AdminBrand[];
  status: string;
  statusCode: number;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
  };
}

export async function getAdminBrands(
    query: {
      page?: string;
      limit?: string;
      search?: string;
    } = {}
): Promise<PaginatedBrands> {
  const { page = "1", limit = "15", search = "" } = query;

  const searchParams = new URLSearchParams();
  if (page) searchParams.set("page", page);
  if (limit) searchParams.set("limit", limit);
  if (search) searchParams.set("search", search);

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/admin/vendors${queryString ? "?" + queryString : ""}`;

  try {
    const token = await getAuthToken();
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });


    return await response.json();
  } catch (e) {
    // Return a proper error structure that matches PaginatedBrands
    return {
      data: [],
      status: "error",
      statusCode: 500,
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        from: 0,
        to: 0,
        total: 0
      }
    };
  }
}