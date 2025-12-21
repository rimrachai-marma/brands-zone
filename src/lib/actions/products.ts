"use server";

import { ProductFormData } from "@/schema/products/create";
import {
    ActionState,
    ApiResponse,
    ErrorData,
    PaginationMeta,
    Product, UserProduct,
} from "@/types";
import { getAuthToken } from "./auth";
import { serverEnv } from "@/data/env";

const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getProducts(query: Record<string, string>): Promise<
  ApiResponse<{
    products: Omit<Product, "reviews">[];
    pagination: PaginationMeta;
  }>
> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/products${queryString}`;
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

export async function getRelatedProducts(id: string): Promise<
  ApiResponse<UserProduct[]>
> {
  try {
    const url = `${API_BASE_URL}/user/${id}/related`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch related products",
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

export async function getVendorProducts(query: Record<string, string>): Promise<
  ApiResponse<{
    products: Omit<Product, "reviews">[];
    pagination: PaginationMeta;
  }>
> {
  const token = await getAuthToken();
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/vendor/products${queryString}`;
    const response = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

export async function getUserProducts(
  query: Record<string, string>
): Promise<ApiResponse<Omit<Product, "reviews">[]>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/user/products${queryString}`;
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

// Get a single product by ID or slug
export async function getProduct(
  identifier: string,
  query?: Record<string, string>
): Promise<ApiResponse<{ product: Product }>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/products/${identifier}${queryString}`;

    const response = await fetch(url, {
      method: "GET",
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

export async function createProduct(
  state: ActionState<{ product: Product }, ErrorData> | null,

  formData: ProductFormData
): Promise<ActionState<{ product: Product }, ErrorData> | null> {
  const token = await getAuthToken();

  if (!token) {
    return {
      status: "error",
      message: "Authentication required",
      data: null,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed create product",
        data: result.data,
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
