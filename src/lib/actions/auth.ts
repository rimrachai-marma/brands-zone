"use server";

import { PasswordData } from "@/app/(pages)/(vandor)/brands/profile/_lib/schemas";
import { serverEnv } from "@/data/env";
import { ActionState, ErrorData, User } from "@/types";
import LoginSignUpData from "@/types/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;
const TOKEN_COOKIE_NAME = serverEnv.TOKEN_COOKIE_NAME || "access_token";
const TOKEN_EXPIRES_IN = parseInt(serverEnv.TOKEN_EXPIRES_IN || "2592000"); // 30 days

export async function loginAction(
  state: ActionState<LoginSignUpData, ErrorData> | null,
  formData: FormData
): Promise<ActionState<LoginSignUpData, ErrorData> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
        remember: formData.get("remember"),
      }),
    });
    const result = await response.json();

    if (response.ok && result.status == "success") {
      const cookieStore = await cookies();
      cookieStore.set(TOKEN_COOKIE_NAME, result.data.access_token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: TOKEN_EXPIRES_IN,
      });
    }

    return result;
  } catch (error) {
    console.log("Login failed: ", error);

    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function signupAction(
  state: ActionState<LoginSignUpData, ErrorData> | null,
  formData: FormData
): Promise<ActionState<LoginSignUpData, ErrorData> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("confirmPassword"),
        terms: formData.get("terms"),
      }),
    });
    const result = await response.json();

    if (response.ok && result.status == "success") {
      const cookieStore = await cookies();
      cookieStore.set(TOKEN_COOKIE_NAME, result.data.access_token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: TOKEN_EXPIRES_IN,
      });
    }

    return result;
  } catch (error) {
    console.log("Signup failed: ", error);

    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function brandsSignupAction(
  state: ActionState<LoginSignUpData, ErrorData> | null,
  formData: FormData
): Promise<ActionState<LoginSignUpData, ErrorData> | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/vendor/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("confirmPassword"),
        terms: formData.get("terms"),
      }),
    });

    const result = await response.json();

    if (response.ok && result.status == "success") {
      const cookieStore = await cookies();

      cookieStore.set(TOKEN_COOKIE_NAME, result.data.access_token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: TOKEN_EXPIRES_IN,
      });
    }

    return result;
  } catch (error) {
    console.log("Vendor signup failed: ", error);

    return {
      status: "error",
      message: "An unexpected error occurred",
      data: null,
    };
  }
}

export async function validateUser(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json())?.data?.user ?? null;
  } catch (error) {
    console.error("Auth validation failed: ", error);
    return null;
  }
}

export async function logout() {
  const token = await getAuthToken();
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    clearAuthCookie();
  }

  redirect("/login");
}

export default async function updatePassword(
  state: ActionState<null, ErrorData> | null,
  data: PasswordData
): Promise<ActionState<null, ErrorData> | null> {
  const token = await getAuthToken();
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.log("Error updating user password:", error);
    return null;
  }
}

// Get authentication token
export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value;
}

// Clear authentication cookie
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_COOKIE_NAME);
}
