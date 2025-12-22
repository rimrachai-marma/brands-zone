// components/category/CategoryList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoryFilterData, CategoryFilterInput, categoryFilterSchema } from '@/schema/category';
import { getCategories } from '@/lib/actions/categories';
import { Category } from '@/types/category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Search } from 'lucide-react';

// Skeleton Loading Rows Component
function CategoryTableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton className="h-6 w-32" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-24" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-6 w-20" />
                    </TableCell>
                    <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}

// Skeleton for filter controls
function FilterSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1">
                <Skeleton className="h-10 w-64" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[180px]" />
            </div>
        </div>
    );
}

// Skeleton for pagination
function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40" />
            <div className="flex gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-9 w-20" />
            </div>
        </div>
    );
}

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        per_page: 12,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    const form = useForm<CategoryFilterInput>({
        resolver: zodResolver(categoryFilterSchema),
        defaultValues: {
            page: 1,
            per_page: 12,
            sort: 'name',
            order: 'asc',
        },
    });

    const fetchCategories = async (filters: CategoryFilterData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getCategories(filters);

            if (response.status === 'success' && response.data) {
                setCategories(response.data.categories ?? []);
                setPagination(response.data.pagination);
            } else {
                setCategories([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch categories');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle search with debounce
    const handleSearchChange = (value: string) => {
        setSearchValue(value);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(() => {
            form.setValue('keyword', value);
            form.setValue('page', 1); // Reset to first page when searching
        }, 500);

        setSearchTimeout(timeout);
    };

    // Handle filter changes
    const handleFilterChange = (key: keyof CategoryFilterInput, value: any) => {
        form.setValue(key, value);
        form.setValue('page', 1); // Reset to first page on filter change
    };

    useEffect(() => {
        const subscription = form.watch((value) => {
            const validatedData = categoryFilterSchema.safeParse(value);
            if (validatedData.success) {
                fetchCategories(validatedData.data);
            }
        });

        // Initial fetch
        const initialValues = categoryFilterSchema.parse(form.getValues());
        fetchCategories(initialValues);

        return () => {
            subscription.unsubscribe();
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, []);

    const handlePageChange = (page: number) => {
        form.setValue('page', page);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <>
                    <FilterSkeleton />
                    <div className="border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Parent</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <CategoryTableSkeleton rows={pagination.per_page} />
                            </TableBody>
                        </Table>
                    </div>
                    <PaginationSkeleton />
                </>
            );
        }

        if (error) {
            return (
                <div className="p-8 text-center">
                    <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-4">
                        {error}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => fetchCategories(categoryFilterSchema.parse(form.getValues()))}
                    >
                        Try Again
                    </Button>
                </div>
            );
        }

        if (categories.length === 0) {
            return (
                <div className="p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
                        <Search className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                    <p className="text-muted-foreground mb-4">
                        {form.watch('keyword')
                            ? `No results for "${form.watch('keyword')}". Try a different search.`
                            : 'No categories have been created yet.'
                        }
                    </p>
                    {form.watch('keyword') && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                form.setValue('keyword', '');
                                setSearchValue('');
                            }}
                        >
                            Clear Search
                        </Button>
                    )}
                </div>
            );
        }

        return (
            <>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search categories..."
                            value={searchValue}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="max-w-sm pl-9"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Select
                            value={form.watch('root_only')?.toString()}
                            onValueChange={(value) => handleFilterChange('root_only', value === 'true')}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Root Categories Only</SelectItem>
                                <SelectItem value="false">All Categories</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={form.watch('sort') ?? undefined}
                            onValueChange={(value) => handleFilterChange('sort', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="created_at">Created Date</SelectItem>
                                <SelectItem value="updated_at">Updated Date</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={form.watch('order') ?? undefined}
                            onValueChange={(value) => handleFilterChange('order', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">Name</TableHead>
                                <TableHead className="w-[150px]">Slug</TableHead>
                                <TableHead className="w-[150px]">Parent</TableHead>
                                <TableHead className="w-[100px]">Products</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-20 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {category.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                                            {category.slug}
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        {category.parent ? (
                                            <Badge variant="outline" className="font-normal">
                                                {category.parent.name}
                                            </Badge>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <span className="font-medium">{category.products_count || 0}</span>
                                            <span className="text-muted-foreground text-sm">products</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={category.is_active ? "default" : "secondary"}
                                            className={category.is_active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                                        >
                                            {category.is_active ? (
                                                <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                          Active
                        </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                          Inactive
                        </span>
                                            )}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer">
                                                    {category.is_active ? (
                                                        <>
                                                            <ToggleLeft className="mr-2 h-4 w-4" />
                                                            Deactivate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ToggleRight className="mr-2 h-4 w-4" />
                                                            Activate
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing <span className="font-semibold">{categories.length}</span> of{' '}
                        <span className="font-semibold">{pagination.total}</span> categories
                        {form.watch('keyword') && (
                            <span className="ml-2">
                for "<span className="font-medium">{form.watch('keyword')}</span>"
              </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                            className="w-24"
                        >
                            Previous
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                                let pageNum;
                                if (pagination.pages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.page <= 3) {
                                    pageNum = i + 1;
                                } else if (pagination.page >= pagination.pages - 2) {
                                    pageNum = pagination.pages - 4 + i;
                                } else {
                                    pageNum = pagination.page - 2 + i;
                                }

                                return (
                                    <Button
                                        key={pageNum}
                                        variant={pagination.page === pageNum ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum}
                                    </Button>
                                );
                            })}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.pages}
                            className="w-24"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </>
        );
    };

    return (
        <Card className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                    <p className="text-muted-foreground">
                        Manage your product categories and subcategories
                    </p>
                </div>
                <Button>Add Category</Button>
            </div>
            {renderContent()}
        </Card>
    );
}