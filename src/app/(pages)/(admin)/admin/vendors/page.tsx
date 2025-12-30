"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    CheckCircle,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminBrands, type PaginatedBrands, type AdminBrand } from "@/lib/actions/admin/vendors";
import Image from "next/image";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";

export default function BrandsPage() {
    const [brands, setBrands] = useState<PaginatedBrands | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(15);

    // Use debounce at the component level
    const debouncedSearch = useDebounce(searchQuery, 300);

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const response = await getAdminBrands({
                page: currentPage.toString(),
                limit: limit.toString(),
                search: searchQuery, // Use the regular searchQuery here, not debounced
            });

            setBrands(response);

            if (response.status !== "success") {
                toast.error("Failed to fetch brands");
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            toast.error("Failed to fetch brands");
        } finally {
            setLoading(false);
        }
    };

    // Fetch when currentPage or limit changes
    useEffect(() => {
        fetchBrands();
    }, [currentPage, limit]);

    // Fetch when debounced search changes
    useEffect(() => {
        if (debouncedSearch !== undefined) {
            setCurrentPage(1); // Reset to first page when searching
            fetchBrands();
        }
    }, [debouncedSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // No need to manually fetch here, useEffect with debounce will handle it
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= (brands?.pagination?.last_page || 1)) {
            setCurrentPage(page);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                    </Badge>
                );
            case "inactive":
                return (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this brand?")) return;

        try {
            // Add delete API call here
            toast.success("Brand deleted successfully");
            fetchBrands(); // Refresh the list
        } catch (error) {
            toast.error("Failed to delete brand");
        }
    };

    return (
        <main className="flex-1 bg-slate-50 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Brands</h1>
                        <p className="text-slate-500 mt-1">Manage product brands</p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Brand
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>All Brands</CardTitle>
                            <form onSubmit={handleSearch} className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search brands..."
                                    className="pl-10"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch(e);
                                        }
                                    }}
                                />
                            </form>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Brand</TableHead>
                                                <TableHead>Contact</TableHead>
                                                <TableHead>Business Type</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Created Date</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {brands?.data?.length ? (
                                                brands.data.map((brand: AdminBrand) => (
                                                    <TableRow key={brand.id}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex items-center gap-3">
                                                                {brand.logo ? (
                                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                                                        <Image
                                                                            src={brand.logo}
                                                                            alt={brand.shop_name}
                                                                            fill
                                                                            className="object-cover"
                                                                            sizes="40px"
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-gray-600">
                                      {brand.shop_name?.charAt(0)?.toUpperCase() || "?"}
                                    </span>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="font-medium text-slate-900">{brand.shop_name}</p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="space-y-1">
                                                                <p className="text-sm">{brand.business_email || "No email"}</p>
                                                                <p className="text-sm text-slate-500">{brand.business_phone || "No phone"}</p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {brand.business_type ? (
                                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                                  {brand.business_type}
                                </span>
                                                            ) : (
                                                                <span className="text-slate-400">N/A</span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>{getStatusBadge(brand.status)}</TableCell>
                                                        <TableCell>{formatDate(brand.created_at)}</TableCell>
                                                        <TableCell className="text-right">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                                        <span className="sr-only">Open menu</span>
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <DropdownMenuItem>
                                                                        <Eye className="h-4 w-4 mr-2" />
                                                                        View Details
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem>
                                                                        <Edit className="h-4 w-4 mr-2" />
                                                                        Edit
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        className="text-red-600"
                                                                        onClick={() => handleDelete(brand.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                                        No brands found
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                {brands && brands.pagination?.total > 0 && (
                                    <div className="flex items-center justify-between px-2 py-4">
                                        <div className="flex-1 text-sm text-slate-500">
                                            Showing {brands.pagination.from} to {brands.pagination.to} of {brands.pagination.total} results
                                        </div>
                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-sm font-medium">Rows per page</p>
                                                <Select
                                                    value={limit.toString()}
                                                    onValueChange={(value) => {
                                                        setLimit(Number(value));
                                                        setCurrentPage(1);
                                                    }}
                                                >
                                                    <SelectTrigger className="h-8 w-[70px]">
                                                        <SelectValue placeholder={limit.toString()} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[10, 15, 20, 30, 50].map((pageSize) => (
                                                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                                                {pageSize}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                                                Page {brands.pagination.current_page} of {brands.pagination.last_page}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    className="hidden h-8 w-8 p-0 lg:flex"
                                                    onClick={() => handlePageChange(1)}
                                                    disabled={brands.pagination.current_page === 1}
                                                >
                                                    <span className="sr-only">Go to first page</span>
                                                    <ChevronsLeft className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handlePageChange(brands.pagination.current_page - 1)}
                                                    disabled={brands.pagination.current_page === 1}
                                                >
                                                    <span className="sr-only">Go to previous page</span>
                                                    <ChevronLeft className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => handlePageChange(brands.pagination.current_page + 1)}
                                                    disabled={brands.pagination.current_page === brands.pagination.last_page}
                                                >
                                                    <span className="sr-only">Go to next page</span>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="hidden h-8 w-8 p-0 lg:flex"
                                                    onClick={() => handlePageChange(brands.pagination.last_page)}
                                                    disabled={brands.pagination.current_page === brands.pagination.last_page}
                                                >
                                                    <span className="sr-only">Go to last page</span>
                                                    <ChevronsRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}