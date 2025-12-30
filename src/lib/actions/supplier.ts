"use server";

import { serverEnv } from "@/data/env";
import { ActionState, ApiResponse, ErrorData, PaginationMeta } from "@/types";
import { Supplier } from "@/types/supplier";
import { getAuthToken } from "./auth";

const API_BASE_URL = serverEnv.API_BASE_URL;

export async function create(
  state: ActionState<{ supplier: Supplier }, ErrorData> | null,
  data: FormData
): Promise<ActionState<{ supplier: Supplier }, ErrorData> | null> {
  const token = await getAuthToken();

  const payload = {
    company_name: data.get("company_name"),
    contact_person: data.get("contact_person"),
    email: data.get("email"),
    phone: data.get("phone"),
    address: data.get("address"),
    status: "active",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/suppliers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await response.json();
  } catch (error) {
    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function getSuppliers(
  query: Record<string, string>
): Promise<ApiResponse<{
  suppliers: Supplier[];
  pagination: PaginationMeta;
}> | null> {
  const token = await getAuthToken();

  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/suppliers${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    return {
      status: "error",
      message: "Failed to fetch suppliers",
      data: null,
    };
  }
}
