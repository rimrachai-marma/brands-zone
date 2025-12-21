// components/hero-section/hero-section-list.tsx
"use client";

import {useState, useEffect} from "react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toggleHeroSectionStatus, deleteHeroSection,getHeroSections } from "@/lib/actions/hero-section";
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

export default function HeroSectionList() {
    const [heroSections, setHeroSections] = useState<HeroSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        per_page: 5,
        total: 0,
    });
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        id: number | null;
        title: string;
    }>({ open: false, id: null, title: "" });

    const fetchHeroSections = (async (page = 1) => {
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
    });

    useEffect(() => {
        fetchHeroSections();
    }, [ search]);

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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <Input
                        placeholder="Search hero sections..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm bg-white"
                    />
                </div>
                <Button asChild>
                    <Link href="/admin/hero/create">Create New</Link>
                </Button>
            </div>

            <div className="border bg-white">
                <Table>
                    <TableHeader >
                        <TableRow >
                            <TableHead>Images</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Subtitle</TableHead>
                            <TableHead>CTA</TableHead>
                            <TableHead>CTA Link</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : heroSections.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No hero sections found
                                </TableCell>
                            </TableRow>
                        ) : (
                            heroSections.map((section) => (
                                <TableRow key={section.id}>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {section.full_image_1 && (
                                                <div className="relative w-12 h-12 border border-gray-200">
                                                    <Image
                                                        src={section.full_image_1}
                                                        alt={section.title}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                            )}
                                            {section.full_image_2 && (
                                                <div className="relative w-12 h-12 border border-gray-200">
                                                    <Image
                                                        src={section.full_image_2}
                                                        alt={section.title}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                            )}
                                            {section.full_image_3 && (
                                                <div className="relative w-12 h-12 border border-gray-200">
                                                    <Image
                                                        src={section.full_image_3}
                                                        alt={section.title}
                                                        fill
                                                        className="object-cover rounded"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{section.title}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                                        {section.subtitle}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                                        {section.cta_text}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground truncate max-w-xs">
                                        {section.cta_link}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={section.is_active ? "default" : "secondary"}>
                                            {section.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    {/*<Link href={`/admin/hero-sections/${section.id}`}>*/}
                                                    {/*    <Eye className="mr-2 h-4 w-4" />*/}
                                                    {/*    View*/}
                                                    {/*</Link>*/}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/hero/${section.id}/edit`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleToggleStatus(section.id)}>
                                                    {section.is_active ? (
                                                        <ToggleLeft className="mr-2 h-4 w-4" />
                                                    ) : (
                                                        <ToggleRight className="mr-2 h-4 w-4" />
                                                    )}
                                                    {section.is_active ? "Deactivate" : "Activate"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() => confirmDelete(section.id, section.title)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {heroSections.length} of {pagination.total} hero sections
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchHeroSections(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchHeroSections(pagination.page + 1)}
                        disabled={pagination.page >= pagination.pages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            <AlertDialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the hero section "{deleteDialog.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}