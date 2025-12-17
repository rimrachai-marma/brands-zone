"use server";

import { serverEnv } from "@/data/env";
import { ActionState, ApiResponse, ErrorData, User } from "@/types";
import { getAuthToken } from "./auth";
import { CartItem } from "@/lib/features/cart/cartSlice";
import { PersonalInfoData } from "@/app/(pages)/(vandor)/brands/profile/_lib/schemas";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getUserProfile(): Promise<ApiResponse<{
  user: User;
}> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return null;
  }
}

export default async function updateUser(
  state: ActionState<{ user: User }, ErrorData> | null,
  data: PersonalInfoData
): Promise<ActionState<
  {
    user: User;
  },
  ErrorData
> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "PUT",
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

export async function getUserCartData(data: {
  cart: CartItem[];
}): Promise<ActionState<
  {
    user: User;
  },
  ErrorData
> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/cart`, {
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

export async function checkout(data: any): Promise<ActionState<
  {
    user: User;
  },
  ErrorData
> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/checkout`, {
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
