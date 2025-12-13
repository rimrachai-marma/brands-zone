"use server";

import {
  ActionState,
  ApiResponse,
  ErrorData,
  PaginationMeta,
  ProductReturn,
  PurchaseOrder,
} from "@/types";
import { getAuthToken } from "./auth";
import { serverEnv } from "@/data/env";
import { ProductDamage } from "@/types/product-loss-damage";
import { PurchaseOrderFormData } from "@/app/(pages)/(vandor)/brands/purchase-orders/create/_components/_lib/schemas";
import { ProductReturnFormData } from "@/app/(pages)/(vandor)/brands/returns/create/_lib/schema";
import { LossDamageFormData } from "@/app/(pages)/(vandor)/brands/losses-damages/create/_lib/schema";

const API_BASE_URL = serverEnv.API_BASE_URL;

export async function createPurchaseOrders(
  state: ActionState<{ purchase_order: PurchaseOrder } | ErrorData> | null,

  formData: PurchaseOrderFormData
): Promise<ActionState<{ purchase_order: PurchaseOrder } | ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/purchase-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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

export async function getPurchaseOrders(
  query: Record<string, string>
): Promise<
  ApiResponse<{ purchase_orders: PurchaseOrder[]; pagination: PaginationMeta }>
> {
  const token = await getAuthToken();

  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/purchase-orders${queryString}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}

export async function createProductReturn(
  state: ActionState<{ productreturn: ProductReturn } | ErrorData> | null,

  formData: ProductReturnFormData
): Promise<ActionState<{ productreturn: ProductReturn } | ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/product-returns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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

export async function createProductDamage(
  state: ActionState<{ productDamage: ProductDamage } | ErrorData> | null,

  formData: LossDamageFormData
): Promise<ActionState<{ productDamage: ProductDamage } | ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/product-damages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
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

export async function getProductReturns(
  query: Record<string, string>
): Promise<
  ApiResponse<{ product_returns: ProductReturn[]; pagination: PaginationMeta }>
> {
  const token = await getAuthToken();

  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/product-returns${queryString}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}

export async function getDamagedProducts(
  query: Record<string, string>
): Promise<
  ApiResponse<{ damages: ProductDamage[]; pagination: PaginationMeta }>
> {
  const token = await getAuthToken();

  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/product-damages${queryString}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}

export async function fetchReturn(
  id: string
): Promise<ApiResponse<{ productReturn: ProductReturn }>> {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/product-returns/${id}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}

export async function fetchDamage(
  id: string
): Promise<ApiResponse<{ productDamage: ProductDamage }>> {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/product-damages/${id}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}
export async function fetchPurchaseOrder(
  id: string
): Promise<ApiResponse<{ purchaseOrder: PurchaseOrder }>> {
  const token = await getAuthToken();

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/purchase-orders/${id}`,
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
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: null,
    };
  }
}
