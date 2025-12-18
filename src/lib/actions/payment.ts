"use server";

import { serverEnv } from "@/data/env";
import { ActionState, ErrorData, User } from "@/types";
import { getAuthToken } from "./auth";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export type paymentData = {
  order_id: string;
  payment_method_id: string;
};

export async function payment(data: paymentData): Promise<ActionState<
  {
    user: User;
  },
  ErrorData
> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/payment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("Error updating user profile:", error);
    return null;
  }
}
