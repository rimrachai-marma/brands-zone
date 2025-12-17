"use server";

import { cookies } from "next/headers";
import { getAuthToken } from "@/lib/actions/auth";
import { ApiResponse, Product } from "@/types";
import { serverEnv } from "@/data/env";
import { ProductFormData } from "@/schema/products/create";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getProducts(query: Record<string, string>): Promise<
  ApiResponse<{
    products: Product[];
  }>
> {
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

const FORM_STATE_COOKIE_NAME = "product_form_draft";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export async function saveFormStateToCookie(
  formData: ProductFormData
): Promise<{ success: boolean; error?: string } | null> {
  "use server";

  try {
    const cookieStore = await cookies();
    const serializedData = JSON.stringify(formData);

    cookieStore.set(FORM_STATE_COOKIE_NAME, serializedData, {
      maxAge: COOKIE_MAX_AGE,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving form state to cookie:", error);
    return { success: false, error: "Failed to save form state" };
  }
}

export async function getFormStateFromCookie(): Promise<ProductFormData | null> {
  try {
    const cookieStore = await cookies();
    const savedData = cookieStore.get(FORM_STATE_COOKIE_NAME);

    if (!savedData?.value) {
      return null;
    }

    return JSON.parse(savedData.value) as ProductFormData;
  } catch (error) {
    console.error("Error retrieving form state from cookie:", error);
    return null;
  }
}

export async function clearFormStateCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(FORM_STATE_COOKIE_NAME);
    return { success: true };
  } catch (error) {
    console.error("Error clearing form state cookie:", error);
    return { success: false, error: "Failed to clear form state" };
  }
}
