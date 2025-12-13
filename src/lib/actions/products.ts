"use server";

import { ProductFormData } from "@/schema/products/create";
import {
  ActionState,
  ApiResponse,
  ErrorData,
  PaginationMeta,
  Product,
} from "@/types";
import { getAuthToken } from "./auth";
import {serverEnv} from "@/data/env";

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

// /**
//  * Get low stock products (requires authentication)
//  */
// export async function getLowStockProducts(params?: {
//   per_page?: number;
//   page?: number;
// }): Promise<ApiResponse<unknown>> {
//   try {
//     const searchParams = new URLSearchParams();

//     if (params?.per_page) {
//       searchParams.append("per_page", params.per_page.toString());
//     }
//     if (params?.page) {
//       searchParams.append("page", params.page.toString());
//     }

//     const url = `${API_BASE_URL}/products/low-stock${
//       searchParams.toString() ? `?${searchParams.toString()}` : ""
//     }`;

//     const response = await fetch(url, {
//       method: "GET",
//       headers: await buildHeaders(true),
//       next: { tags: ["products-low-stock"] },
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return {
//         status: "error",
//         message: result.message || "Failed to fetch low stock products",
//         data: null,
//       };
//     }

//     return result;
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

export async function createProduct(
  state: ActionState<{ product: Product } | ErrorData> | null,

  formData: ProductFormData
): Promise<ActionState<{ product: Product } | ErrorData> | null> {
  const token = await getAuthToken();

  if (!token) {
    return {
      status: "error",
      message: "Authentication required",
      data: null,
    };
  }

  const dataWithDefaults = {
    ...formData,
    status: "published",
    published_at: new Date().toISOString(),
  };

  try {
    const response = await fetch(`${API_BASE_URL}/vendor/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataWithDefaults),
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

// /**
//  * Update an existing product (requires authentication)
//  */
// export async function updateProduct(
//   id: string, // UUID
//   formData: Partial<{
//     name: string;
//     brand_id: number;
//     campaign_id: string;
//     description: string;
//     short_description: string;
//     category_ids: number[];
//     currency: string;
//     low_stock_threshold: number;
//     weight: number;
//     weight_unit: string;
//     length: number;
//     width: number;
//     height: number;
//     dimension_unit: string;
//     specifications: Record<string, unknown>;
//     meta_title: string;
//     meta_description: string;
//     meta_keywords: string;
//     canonical_url: string;
//     status: "draft" | "published" | "archived";
//     featured: boolean;
//     published_at: string;
//     images: Array<{
//       url: string;
//       alt_text?: string;
//       order?: number;
//     }>;
//     attributes: Array<{
//       name: string;
//       slug: string;
//       type: "select" | "color" | "text";
//       options: Array<{ label: string; value: string }>;
//     }>;
//     variants: Array<{
//       sku: string;
//       barcode?: string;
//       attributes?: Record<string, string>;
//       price: number;
//       sale_price?: number;
//       cost_price?: number;
//       stock_quantity?: number;
//       weight: number;
//       weight_unit?: string;
//       length?: number;
//       width?: number;
//       height?: number;
//       dimension_unit?: string;
//     }>;
//   }>
// ): Promise<ActionState<{ updated_product: Product }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: "PUT",
//       headers: await buildHeaders(true),
//       body: JSON.stringify(formData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Product not found",
//         };
//       }

//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       if (response.status === 422) {
//         return {
//           status: "error",
//           message: result.message || "Validation failed",
//           errors: parseValidationErrors(result),
//         };
//       }

//       if (response.status === 500) {
//         return {
//           status: "error",
//           message:
//             result.message || result.data?.error || "Failed to update product",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to update product",
//       };
//     }

//     revalidateTag("products");
//     revalidateTag(`product-${id}`);
//     revalidatePath("/products");
//     revalidatePath(`/products/${id}`);

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
//  * Delete a product (requires authentication)
//  */
// export async function deleteProduct(
//   id: string
// ): Promise<ActionState<{ deletedProduct: Product }>> {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: "DELETE",
//       headers: await buildHeaders(true),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Product not found",
//         };
//       }

//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to delete product",
//       };
//     }

//     revalidateTag("products");
//     revalidateTag(`product-${id}`);
//     revalidatePath("/products");

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
//  * Toggle product featured status (requires authentication)
//  */
// export async function toggleProductFeatured(
//   id: string
// ): Promise<ActionState<{ updatedProduct: Product }>> {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/products/${id}/toggle-featured`,
//       {
//         method: "PATCH",
//         headers: await buildHeaders(true),
//       }
//     );

//     const result = await response.json();

//     if (!response.ok) {
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Product not found",
//         };
//       }

//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to toggle featured status",
//       };
//     }

//     revalidateTag("products");
//     revalidateTag(`product-${id}`);
//     revalidatePath("/products");
//     revalidatePath(`/products/${id}`);

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
//  * Update product status (requires authentication)
//  */
// export async function updateProductStatus(
//   id: string,
//   status: "draft" | "published" | "archived"
// ): Promise<ActionState<{ updatedProduct: Product }>> {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/products/${id}/update-status`,
//       {
//         method: "PATCH",
//         headers: await buildHeaders(true),
//         body: JSON.stringify({ status }),
//       }
//     );

//     const result = await response.json();

//     if (!response.ok) {
//       if (response.status === 404) {
//         return {
//           status: "error",
//           message: result.message || "Product not found",
//         };
//       }

//       if (response.status === 401) {
//         return {
//           status: "error",
//           message: result.message || "Unauthenticated",
//         };
//       }

//       if (response.status === 403) {
//         return {
//           status: "error",
//           message: result.message || "Forbidden",
//         };
//       }

//       if (response.status === 422) {
//         return {
//           status: "error",
//           message: result.message || "Validation failed",
//           errors: parseValidationErrors(result),
//         };
//       }

//       return {
//         status: "error",
//         message: result.message || "Failed to update product status",
//       };
//     }

//     revalidateTag("products");
//     revalidateTag(`product-${id}`);
//     revalidatePath("/products");
//     revalidatePath(`/products/${id}`);

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
//  * Helper: Get cheapest variant price
//  */
// export function getCheapestPrice(product: Product): number {
//   if (!product.variants || product.variants.length === 0) return 0;

//   const prices = product.variants.map((v) => v.sale_price || v.price);
//   return Math.min(...prices);
// }

// /**
//  * Helper: Get price range for display
//  */
// export function getPriceRange(product: Product): { min: number; max: number } {
//   if (!product.variants || product.variants.length === 0) {
//     return { min: 0, max: 0 };
//   }

//   const prices = product.variants.map((v) => v.sale_price || v.price);
//   return {
//     min: Math.min(...prices),
//     max: Math.max(...prices),
//   };
// }

// /**
//  * Helper: Check if product is on sale
//  */
// export function isOnSale(product: Product): boolean {
//   // Check if any variant has sale price
//   const hasSalePrice = product.variants?.some(
//     (v) => v.sale_price && v.sale_price < v.price
//   );

//   // Check if product has active campaign
//   const hasActiveCampaign = product.campaign?.id !== undefined;

//   return hasSalePrice || hasActiveCampaign;
// }

// /**
//  * Helper: Check if product is in stock
//  */
// export function isInStock(product: Product): boolean {
//   return product.variants?.some((v) => v.stock_quantity > 0) || false;
// }

// /**
//  * Helper: Get total stock across all variants
//  */
// export function getTotalStock(product: Product): number {
//   if (!product.variants) return 0;
//   return product.variants.reduce((sum, v) => sum + v.stock_quantity, 0);
// }

// /**
//  * Helper: Calculate discount percentage
//  */
// export function getDiscountPercentage(variant: ProductVariant): number {
//   if (!variant.sale_price) return 0;
//   return Math.round(
//     ((variant.price - variant.sale_price) / variant.price) * 100
//   );
// }
