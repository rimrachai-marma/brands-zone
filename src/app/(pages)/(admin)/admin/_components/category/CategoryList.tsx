// components/category/CategoryList.tsx
'use client';

import {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CategoryFilterData, CategoryFilterInput, categoryFilterSchema} from '@/schema/category';
import {deleteCategory, getCategories} from '@/lib/actions/admin/category';
import {Category} from '@/types/category';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
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
import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {MoreHorizontal, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Search, Plus} from 'lucide-react';
import Image from "next/image";
import {TableSkeleton} from "@/app/(pages)/(admin)/admin/_components/category/Skeleton";
import {CategoryForm} from "./CategoryForm";
import { toast } from "sonner";

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
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
            per_page: 10,
            sort: 'name',
            order: 'asc',
            with_parent:true
        },
    });

    const fetchCategories = async (filters: CategoryFilterData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getCategories(filters);
            if (response.status === 'success' && response.data) {
                setCategories(response.data);
                setPagination(response.pagination);


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
            form.setValue('page', 1);
        }, 500);

        setSearchTimeout(timeout);
    };

    // Handle filter changes
    const handleFilterChange = (key: keyof CategoryFilterInput, value: string) => {
        form.setValue(key, value);
        form.setValue('page', 1);
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

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (category: Category) => {
        setCategoryToDelete(category);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!categoryToDelete) return;

        try {
await deleteCategory(categoryToDelete.slug)


            toast.success(`Category "${categoryToDelete.name}" deleted successfully`);
            setDeleteDialogOpen(false);
            setCategoryToDelete(null);

            // Refresh categories list
            const currentFilters = categoryFilterSchema.parse(form.getValues());
            fetchCategories(currentFilters);
        } catch (error) {
            toast.error("Failed to delete category");
        }
    };

    const handleFormSuccess = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedCategory(null);

        // Refresh categories list
        const currentFilters = categoryFilterSchema.parse(form.getValues());
        fetchCategories(currentFilters);
    };

    const renderContent = () => {
        if (loading) return <TableSkeleton/>

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
                        <Search className="h-6 w-6"/>
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
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
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
                                <SelectValue placeholder="Filter by level"/>
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
                                <SelectValue placeholder="Sort by"/>
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
                                <SelectValue placeholder="Order"/>
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
                                <TableHead className="w-[120px]">Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-[150px]">Slug</TableHead>
                                <TableHead className="w-[150px]">Parent</TableHead>
                                <TableHead className="w-20 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border">
                                            {category.image ? (
                                                <Image
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="60px"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted flex items-center justify-center">
                                                    <span className="text-xs text-muted-foreground">
                                                        No image
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="font-medium">{category.name}</div>
                                        {category.description && (
                                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                {category.description}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <code className="text-xs bg-muted px-2 py-1 rounded">
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

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleEditClick(category)}
                                        >
                                            <Edit className="mr-2 h-4 w-4"/>
                                        </button>
                                        <button
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            onClick={() => handleDeleteClick(category)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4"/>
                                        </button>
                                        </div>
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
                                for <span className="font-medium">{form.watch('keyword')}</span>
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
                        <div className="text-sm text-muted-foreground">
                            Page {pagination.page} of {pagination.pages}
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
        <>
            <Card className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
                        <p className="text-muted-foreground">
                            Manage your product categories and subcategories
                        </p>
                    </div>
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Create New Category</DialogTitle>
                                <DialogDescription>
                                    Add a new category to organize your products
                                </DialogDescription>
                            </DialogHeader>
                            <CategoryForm
                                onSuccess={handleFormSuccess}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                {renderContent()}
            </Card>

            {/* Edit Category Dialog */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                        <DialogDescription>
                            Update category details
                        </DialogDescription>
                    </DialogHeader>
                    {selectedCategory && (
                        <CategoryForm
                            category={selectedCategory}
                            onSuccess={handleFormSuccess}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the category
                            {categoryToDelete?.name} and all its subcategories.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}