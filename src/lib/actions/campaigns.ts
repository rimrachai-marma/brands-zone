"use server";

import { ApiResponse } from "@/types";
import { Campaigns } from "@/types/campaigns";
import {serverEnv} from "@/data/env";
// import { revalidatePath, revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getCampaigns(
  query: Record<string, string>
): Promise<ApiResponse<Campaigns>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/campaigns${queryString}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch campaigns",
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

// /**
//  * Get a single campaign with its products
//  */
// export async function getCampaign(
//   id: string, // UUID
//   productsPerPage = 12
// ): Promise<ApiResponse<CampaignShowResponse>> {
//   try {
//     const searchParams = new URLSearchParams();
//     searchParams.append("per_page", productsPerPage.toString());

//     const url = `${API_BASE_URL}/campaigns/${id}${
//       searchParams.toString() ? `?${searchParams.toString()}` : ""
//     }`;

//     const response = await fetch(url, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: ["campaigns", `campaign-${id}`] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch campaign",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// /**
//  * Get campaign statistics
//  */
// export async function getCampaignStatistics(
//   id: string // UUID
// ): Promise<
//   ApiResponse<{ campaign: Campaign; statistics: CampaignStatistics }>
// > {
//   try {
//     const response = await fetch(`${API_BASE_URL}/campaigns/${id}/statistics`, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: [`campaign-${id}-statistics`] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch campaign statistics",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// /**
//  * Create a new campaign (requires authentication)
//  */
// export async function createCampaign(formData: {
//   name: string;
//   slug: string;
//   description?: string;
//   banner_image?: string;
//   discount_percentage: number;
//   starts_at: string; // ISO 8601 format
//   ends_at: string; // ISO 8601 format
//   badge_text?: string;
//   badge_color?: string;
//   is_active?: boolean;
// }): Promise<ActionState<{ campaign: Campaign }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/campaigns`, {
//       method: "POST",
//       headers: await buildHeaders(true),
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle authentication errors
//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       // Handle authorization errors
//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       // Handle validation errors
//       if (response.status === 422) {
//         return {
//           status: "error",
//           message: result.message || "Validation failed",
//           errors: parseValidationErrors(result),
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to create campaign",
//       };
//     }

//     // Revalidate campaigns list
//     revalidateTag("campaigns");
//     revalidatePath("/campaigns");

//     return {
//       status: "success",
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

// /**
//  * Update an existing campaign (requires authentication)
//  */
// export async function updateCampaign(
//   id: string, // UUID
//   formData: {
//     name?: string;
//     slug?: string;
//     description?: string;
//     banner_image?: string;
//     discount_percentage?: number;
//     starts_at?: string;
//     ends_at?: string;
//     badge_text?: string;
//     badge_color?: string;
//     is_active?: boolean;
//   }
// ): Promise<ActionState<{ updatedCampaign: Campaign }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
//       method: "PUT",
//       headers: await buildHeaders(true),
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Campaign not found",
//         };
//       }

//       // Handle authentication errors
//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       // Handle authorization errors
//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       // Handle validation errors
//       if (response.status === 422) {
//         return {
//           status: "error",
//           message: result.message || "Validation failed",
//           errors: parseValidationErrors(result),
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to update campaign",
//       };
//     }

//     // Revalidate specific campaign and list
//     revalidateTag("campaigns");
//     revalidateTag(`campaign-${id}`);
//     revalidateTag(`campaign-${id}-statistics`);
//     revalidatePath("/campaigns");
//     revalidatePath(`/campaigns/${id}`);

//     return {
//       status: "success",
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

// /**
//  * Delete a campaign (requires authentication)
//  */
// export async function deleteCampaign(
//   id: string
// ): Promise<ActionState<{ deletedCampaign: Campaign }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
//       method: "DELETE",
//       headers: await buildHeaders(true),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Campaign not found",
//         };
//       }

//       // Handle authentication errors
//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       // Handle authorization errors
//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to delete campaign",
//       };
//     }

//     // Revalidate campaigns list
//     revalidateTag("campaigns");
//     revalidateTag(`campaign-${id}`);
//     revalidateTag(`campaign-${id}-statistics`);
//     revalidatePath("/campaigns");

//     return {
//       status: "success",
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

// /**
//  * Toggle campaign active status (requires authentication)
//  */
// export async function toggleCampaignStatus(
//   id: string
// ): Promise<ActionState<{ updatedCampaign: Campaign }>> {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/campaigns/${id}/toggle-status`,
//       {
//         method: "PATCH",
//         headers: await buildHeaders(true),
//       }
//     );

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Campaign not found",
//         };
//       }

//       // Handle authentication errors
//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       // Handle authorization errors
//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to toggle campaign status",
//       };
//     }

//     // Revalidate specific campaign and list
//     revalidateTag("campaigns");
//     revalidateTag(`campaign-${id}`);
//     revalidateTag(`campaign-${id}-statistics`);
//     revalidatePath("/campaigns");
//     revalidatePath(`/campaigns/${id}`);

//     return {
//       status: "success",
//       message: result.message,
//       data: result.data,
//     };
//   } catch (error) {
//     return {
//       status: "error",
//       message:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

// /**
//  * Helper function to check if a campaign is ongoing
//  */
// export function isCampaignOngoing(campaign: Campaign): boolean {
//   const now = new Date();
//   const starts = new Date(campaign.starts_at);
//   const ends = new Date(campaign.ends_at);

//   return starts <= now && ends >= now && campaign.is_active;
// }

// /**
//  * Helper function to check if a campaign is upcoming
//  */
// export function isCampaignUpcoming(campaign: Campaign): boolean {
//   const now = new Date();
//   const starts = new Date(campaign.starts_at);

//   return starts > now && campaign.is_active;
// }

// /**
//  * Helper function to check if a campaign has expired
//  */
// export function isCampaignExpired(campaign: Campaign): boolean {
//   const now = new Date();
//   const ends = new Date(campaign.ends_at);

//   return ends < now;
// }

// /**
//  * Helper function to get days remaining in a campaign
//  */
// export function getDaysRemaining(campaign: Campaign): number {
//   const now = new Date();
//   const ends = new Date(campaign.ends_at);

//   const diffTime = ends.getTime() - now.getTime();
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays > 0 ? diffDays : 0;
// }

// /**
//  * Helper function to format discount percentage
//  */
// export function formatDiscount(campaign: Campaign): string {
//   return `${campaign.discount_percentage}%`;
// }

// /**
//  * Helper function to calculate discounted price
//  */
// export function calculateDiscountedPrice(
//   originalPrice: number,
//   campaign: Campaign
// ): number {
//   const discountAmount = (originalPrice * campaign.discount_percentage) / 100;
//   return originalPrice - discountAmount;
// }
