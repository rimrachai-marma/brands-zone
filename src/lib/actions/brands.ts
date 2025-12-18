"use server";

import { ApiResponse, Brands } from "@/types";
import {serverEnv} from "@/data/env";

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getBrands(
  query: Record<string, string>
): Promise<ApiResponse<Brands>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/brands${queryString}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch brands",
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

// export async function getBrand(
//   id: number,
//   withProductsCount = false
// ): Promise<ApiResponse<{ brand: Brand }>> {
//   try {
//     const searchParams = new URLSearchParams();
//     if (withProductsCount) {
//       searchParams.append("with_products_count", "1");
//     }

//     const url = `${API_BASE_URL}/brands/${id}${
//       searchParams.toString() ? `?${searchParams.toString()}` : ""
//     }`;

//     const response = await fetch(url, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: ["brands", `brand-${id}`] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch brand",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// /**
//  * Create a new brand (requires authentication)
//  * Returns ActionState for form handling with validation errors
//  */
// export async function createBrand(formData: {
//   name: string;
//   slug: string;
//   description?: string;
//   logo?: string;
//   website?: string;
//   is_active?: boolean;
// }): Promise<ActionState<{ brand: Brand }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/brands`, {
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

//       // Handle other errors
//       return {
//         status: "error",
//         message: result.message || "Failed to create brand",
//       };
//     }

//     // Revalidate brands list
//     revalidateTag("brands");
//     revalidatePath("/brands");

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
//  * Update an existing brand (requires authentication)
//  * Returns ActionState for form handling with validation errors
//  */
// export async function updateBrand(
//   id: number,
//   formData: {
//     name?: string;
//     slug?: string;
//     description?: string;
//     logo?: string;
//     website?: string;
//     is_active?: boolean;
//   }
// ): Promise<ActionState<{ updatedBrand: Brand }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
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
//           message: result.message || "Brand not found",
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
//         message: result.message || "Failed to update brand",
//       };
//     }

//     // Revalidate specific brand and list
//     revalidateTag("brands");
//     revalidateTag(`brand-${id}`);
//     revalidatePath("/brands");
//     revalidatePath(`/brands/${id}`);

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
//  * Delete a brand (requires authentication)
//  */
// export async function deleteBrand(
//   id: number
// ): Promise<ActionState<{ deleted_brand: Brand }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
//       method: "DELETE",
//       headers: await buildHeaders(true),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Brand not found",
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

//       // Handle business logic errors (e.g., brand has products)
//       if (response.status === 400) {
//         return {
//           status: "error",
//           message: result.message || "Cannot delete brand",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to delete brand",
//       };
//     }

//     // Revalidate brands list
//     revalidateTag("brands");
//     revalidateTag(`brand-${id}`);
//     revalidatePath("/brands");

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
//  * Toggle brand active status (requires authentication)
//  */
// export async function toggleBrandStatus(
//   id: number
// ): Promise<ActionState<{ updated_brand: Brand }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/brands/${id}/toggle-status`, {
//       method: "PATCH",
//       headers: await buildHeaders(true),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Brand not found",
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
//         message: result.message || "Failed to toggle brand status",
//       };
//     }

//     // Revalidate specific brand and list
//     revalidateTag("brands");
//     revalidateTag(`brand-${id}`);
//     revalidatePath("/brands");
//     revalidatePath(`/brands/${id}`);

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
//  * Get brand statistics
//  */
// export async function getBrandStatistics(
//   id: number
// ): Promise<ApiResponse<{ brand: Brand; statistics: BrandStatistics }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/brands/${id}/statistics`, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: [`brand-${id}-statistics`] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch brand statistics",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }
