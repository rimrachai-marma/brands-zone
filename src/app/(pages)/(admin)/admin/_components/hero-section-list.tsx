// components/hero-section/hero-section-list.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toggleHeroSectionStatus, deleteHeroSection, getHeroSections } from "@/lib/actions/hero-section";
import { HeroSection } from "@/types/hero-section";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SkeletonRow from "@/components/Hero/Skeleton";
import {Switch} from "@/components/ui/switch";

export default function HeroSectionList() {
    const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        per_page: 10,
        total: 0,
    });
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        id: number | null;
        title: string;
    }>({ open: false, id: null, title: "" });

    const fetchHeroSections = async (page = 1) => {
        try {
            setLoading(true);
            const response = await getHeroSections({
                page,
                limit: 5,
                search,
            });

            if (response.success) {
                setHeroSections(response.data);
                if (response.pagination) {
                    setPagination(response.pagination);
                }
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Failed to fetch hero sections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroSections();
    }, [search]);

    const handleToggleStatus = async (id: number) => {
        try {
            await toggleHeroSectionStatus(id);
            toast.success("Status updated successfully");
            fetchHeroSections(pagination.page);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!deleteDialog.id) return;

        try {
            await deleteHeroSection(deleteDialog.id);
            toast.success("Hero section deleted successfully");
            setDeleteDialog({ open: false, id: null, title: "" });
            fetchHeroSections(pagination.page);
        } catch (error) {
            toast.error("Failed to delete hero section");
        }
    };

    const confirmDelete = (id: number, title: string) => {
        setDeleteDialog({ open: true, id, title });
    };


    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Hero Sections</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage hero sections for your website
                    </p>
                </div>

            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by title or subtitle"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-white"
                    />
                </div>
                <Button asChild>
                    <Link href="/admin/hero/create" className="whitespace-nowrap">
                        + Create New
                    </Link>
                </Button>
            </div>

            {/* Table Container */}
            <div className="border rounded-lg bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[180px]">Images</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead className="min-w-[200px]">Subtitle</TableHead>
                                <TableHead>CTA</TableHead>
                                <TableHead>CTA Link</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[150px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                // Loading Skeleton
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SkeletonRow key={index} />
                                ))
                            ) : heroSections.length === 0 ? (
                                // Empty State
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-12">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="text-muted-foreground">
                                                No hero sections found
                                            </div>
                                            {search && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSearch("")}
                                                >
                                                    Clear search
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Data Rows
                                heroSections.map((section) => (
                                    <TableRow key={section.id} className="group hover:bg-muted/50">
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {section.full_image_1 && (
                                                    <div className="relative w-12 h-12 border border-muted rounded overflow-hidden">
                                                        <Image
                                                            src={section.full_image_1}
                                                            alt={section.title}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                {section.full_image_2 && (
                                                    <div className="relative w-12 h-12 border border-muted rounded overflow-hidden">
                                                        <Image
                                                            src={section.full_image_2}
                                                            alt={section.title}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                {section.full_image_3 && (
                                                    <div className="relative w-12 h-12 border border-muted rounded overflow-hidden">
                                                        <Image
                                                            src={section.full_image_3}
                                                            alt={section.title}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="truncate max-w-[150px]">
                                                {section.title}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="truncate max-w-[250px] text-sm text-muted-foreground">
                                                {section.subtitle}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="truncate max-w-[120px]">
                                                {section.cta_text}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="truncate max-w-[150px] text-sm text-muted-foreground">
                                                {section.cta_link}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={section.is_active ? "default" : "secondary"}
                                                className={`
                                                    ${section.is_active
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                                }
                                                `}
                                            >
                                                {section.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    asChild
                                                    className="h-8 w-8"
                                                >
                                                    <Link href={`/admin/hero/${section.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleToggleStatus(section.id)}
                                                    className="h-8 w-8"
                                                    title={section.is_active ? "Deactivate" : "Activate"}
                                                >
                                                    <Switch checked={section.is_active} id="airplane-mode" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => confirmDelete(section.id, section.title)}
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            {(heroSections.length > 0 || loading) && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                        Showing {heroSections.length} of {pagination.total} hero sections
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchHeroSections(pagination.page - 1)}
                            disabled={pagination.page <= 1 || loading}
                        >
                            Previous
                        </Button>
                        <div className="text-sm font-medium">
                            Page {pagination.page} of {pagination.pages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchHeroSections(pagination.page + 1)}
                            disabled={pagination.page >= pagination.pages || loading}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Hero Section</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete <strong>{deleteDialog.title}</strong>?
                            This action cannot be undone and will permanently remove this hero section.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}