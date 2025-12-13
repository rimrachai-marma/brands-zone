import { getAuthToken } from "./auth";
import { serverEnv } from "@/data/env";
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getCurrentStocks(
  query: Record<string, string>
): Promise<any | null> {
  const token = await getAuthToken();

  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/vendor/products/current-stock${queryString}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log("Get suppliers error:", error);
    return {
      status: "error",
      message: "Failed to fetch suppliers",
      data: null,
    };
  }
}
