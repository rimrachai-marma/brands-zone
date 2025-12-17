"use server";

import { ActionState, ErrorData, ProductReview } from "@/types";
import { getAuthToken } from "./auth";
import { ReviewFormData } from "@/schema/review";
import { serverEnv } from "@/data/env";

const API_BASE_URL = serverEnv.API_BASE_URL;

export async function createReview(
  state: ActionState<{ productReview: ProductReview }, ErrorData> | null,
  formData: ReviewFormData & { product_id: string }
): Promise<ActionState<{ productReview: ProductReview }, ErrorData> | null> {
  const token = await getAuthToken();

  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
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
