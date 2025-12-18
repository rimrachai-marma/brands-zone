"use server";

import { ApiResponse, Categories } from "@/types";
import {serverEnv} from "@/data/env";
// import { revalidatePath, revalidateTag } from "next/cache";
// import { cookies } from "next/headers";

// Action state types for form handling

// Configuration
const API_BASE_URL = serverEnv.API_BASE_URL;

export async function getCategories(
  query: Record<string, string>
): Promise<ApiResponse<Categories>> {
  const searchParams = new URLSearchParams(query).toString();

  let queryString = "";
  if (searchParams) {
    queryString += "?" + searchParams;
  }

  try {
    const url = `${API_BASE_URL}/categories${queryString}`;
    const response = await fetch(url);

    const result = await response.json();

    if (!response.ok) {
      return {
        status: "error",
        message: result.message || "Failed to fetch categories",
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
//  * Get a single category by ID
//  */
// export async function getCategory(
//   id: number,
//   options?: {
//     with_children?: boolean;
//     with_parent?: boolean;
//     with_products?: boolean;
//   }
// ): Promise<ApiResponse<{ category: Category }>> {
//   try {
//     const searchParams = new URLSearchParams();

//     if (options?.with_children) {
//       searchParams.append("with_children", "1");
//     }
//     if (options?.with_parent) {
//       searchParams.append("with_parent", "1");
//     }
//     if (options?.with_products) {
//       searchParams.append("with_products", "1");
//     }

//     const url = `${API_BASE_URL}/categories/${id}${
//       searchParams.toString() ? `?${searchParams.toString()}` : ""
//     }`;

//     const response = await fetch(url, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: ["categories", `category-${id}`] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch category",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// /**
//  * Get category tree (hierarchical structure)
//  */
// export async function getCategoryTree(): Promise<
//   ApiResponse<{ categories_tree: Category[] }>
// > {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories/type/tree`, {
//       method: "GET",
//       headers: await buildHeaders(),
//       next: { tags: ["category-tree"] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch category tree",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// /**
//  * Create a new category (requires authentication)
//  */
// export async function createCategory(formData: {
//   name: string;
//   slug: string;
//   description?: string;
//   image?: string;
//   parent_id?: number | null;
//   is_active?: boolean;
// }): Promise<ActionState<{ category: Category }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories`, {
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
//         message: result.message || "Failed to create category",
//       };
//     }

//     // Revalidate categories and tree
//     revalidateTag("categories");
//     revalidateTag("category-tree");
//     revalidatePath("/categories");

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
//  * Update an existing category (requires authentication)
//  */
// export async function updateCategory(
//   id: number,
//   formData: {
//     name?: string;
//     slug?: string;
//     description?: string;
//     image?: string;
//     parent_id?: number | null;
//     is_active?: boolean;
//   }
// ): Promise<ActionState<{ updated_category: Category }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
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
//           message: result.message || "Category not found",
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
//         message: result.message || "Failed to update category",
//       };
//     }

//     // Revalidate specific category, list, and tree
//     revalidateTag("categories");
//     revalidateTag(`category-${id}`);
//     revalidateTag("category-tree");
//     revalidatePath("/categories");
//     revalidatePath(`/categories/${id}`);

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
//  * Delete a category (requires authentication)
//  */
// export async function deleteCategory(
//   id: number
// ): Promise<ActionState<{ deletedCategory: Category }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
//       method: "DELETE",
//       headers: await buildHeaders(true),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       // Handle not found
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Category not found",
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

//       // Handle business logic errors (has children or products)
//       if (response.status === 400) {
//         return {
//           status: "error",
//           message: result.message || "Cannot delete category",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to delete category",
//       };
//     }

//     // Revalidate categories and tree
//     revalidateTag("categories");
//     revalidateTag(`category-${id}`);
//     revalidateTag("category-tree");
//     revalidatePath("/categories");

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
//  * Toggle category active status (requires authentication)
//  */
// export async function toggleCategoryStatus(
//   id: number
// ): Promise<ActionState<{ category: Category }>> {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/categories/${id}/toggle-status`,
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
//           message: result.message || "Category not found",
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
//         message: result.message || "Failed to toggle category status",
//       };
//     }

//     // Revalidate specific category, list, and tree
//     revalidateTag("categories");
//     revalidateTag(`category-${id}`);
//     revalidateTag("category-tree");
//     revalidatePath("/categories");
//     revalidatePath(`/categories/${id}`);

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
