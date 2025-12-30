"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Testimonial } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import {
    Star,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    MoreVertical,
    CheckCircle,
    XCircle,
    Calendar
} from "lucide-react";
import {Switch} from "@/components/ui/switch";

interface TestimonialsTableProps {
    testimonials: Testimonial[];
    onEdit: (testimonial: Testimonial) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
    isLoading?: boolean;
}

export default function TestimonialsTable({
                                              testimonials,
                                              onEdit,
                                              onDelete,
                                              onToggleStatus,
                                              isLoading = false,
                                          }: TestimonialsTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDeleteClick = (id: string) => {
        setSelectedTestimonial(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedTestimonial) {
            onDelete(selectedTestimonial);
            setSelectedTestimonial(null);
        }
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="hidden md:table-cell">Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                                            <div className="h-3 bg-muted rounded w-32 animate-pulse" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-6 bg-muted rounded w-20 animate-pulse" />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="h-4 bg-muted rounded w-40 animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="h-6 bg-muted rounded w-16 animate-pulse" />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="h-4 bg-muted rounded w-20 animate-pulse" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="h-8 bg-muted rounded w-24 animate-pulse" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : testimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    <div className="text-muted-foreground">No testimonials found.</div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            testimonials.map((testimonial) => (
                                <motion.tr
                                    key={testimonial.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <TableCell>
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={testimonial.avatar_url} alt={testimonial.name} className={'object-cover'}/>
                                            <AvatarFallback>
                                                {testimonial.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{testimonial.name}</div>
                                            {testimonial.designation && (
                                                <div className="text-sm text-muted-foreground">
                                                    {testimonial.designation}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < testimonial.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-muted"
                                                    }`}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm font-medium">
                        {testimonial.rating}
                      </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="max-w-md">
                                            <p className="text-sm line-clamp-2">
                                                {testimonial.message?.length>50 ? testimonial.message.slice(0,50)+'...':testimonial.message}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={testimonial.is_active ? "default" : "secondary"}
                                            className={`flex items-center gap-1 ${
                                                testimonial.is_active
                                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                                            }`}
                                        >
                                            {testimonial.is_active ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    Active
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3" />
                                                    Inactive
                                                </>
                                            )}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(testimonial.created_at)}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                       <div className={'flex items-center justify-end'}>
                                           <button onClick={() => onToggleStatus(testimonial.id)} className="mr-6 h-4 w-4">
                                               <Switch id="is_active" />
                                           </button>
                                           <button onClick={() => onEdit(testimonial)}>
                                               <Edit className="mr-2 h-4 w-4" />
                                           </button>
                                           <button
                                               className="text-destructive"
                                               onClick={() => handleDeleteClick(testimonial.id)}
                                           >
                                               <Trash2 className="mr-2 h-4 w-4" />

                                           </button>
                                       </div>
                                    </TableCell>
                                </motion.tr>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the testimonial.
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