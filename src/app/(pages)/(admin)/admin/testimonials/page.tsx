"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    getAdminTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialStatus
} from "@/lib/actions/testimonial";
import { Testimonial, CreateTestimonialData, UpdateTestimonialData } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";
import TestimonialForm from "@/components/Testimonials/TestimonialForm";
import TestimonialsTable from "@/components/Testimonials/TestimonialsTable";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Fetch testimonials
    const fetchTestimonials = async () => {
        try {
            setIsLoading(true);
            const response = await getAdminTestimonials({
                is_active: statusFilter !== "all" ? statusFilter === "active" : undefined,
                search: searchQuery || undefined,
            });
            setTestimonials(response.data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, [statusFilter]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTestimonials();
    };

    const handleCreateTestimonial = async (data: CreateTestimonialData) => {
        try {
            setIsSubmitting(true);
           const res = await createTestimonial(data);
          if (res.status=='success') {
              await fetchTestimonials();
              setIsFormOpen(false);
          }
        } catch (error) {
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTestimonial = async (data: UpdateTestimonialData) => {
        if (!editingTestimonial) return;

        try {
            setIsSubmitting(true);
            const res = await updateTestimonial(editingTestimonial.id, data);
          if (res.status=='success') {
              await fetchTestimonials();
              setEditingTestimonial(null);
          }
        } catch (error) {
            console.error("Error updating testimonials:", error);
            alert("Failed to update testimonials");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        try {
            await deleteTestimonial(id);
            await fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonials:", error);
            alert("Failed to delete testimonials");
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            await toggleTestimonialStatus(id);
            await fetchTestimonials();
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };


    return (
        <div className="container mx-auto py-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
                    <p className="text-muted-foreground">
                        Manage customer testimonials and reviews
                    </p>
                </div>
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Testimonial
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>
                        Search and filter testimonials
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3 justify-between items-center ">
                        <form onSubmit={handleSearch} className="md:col-span-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search testimonials..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </form>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={'mt-5'}
                    >
                        <TestimonialsTable
                            testimonials={testimonials}
                            onEdit={setEditingTestimonial}
                            onDelete={handleDeleteTestimonial}
                            onToggleStatus={handleToggleStatus}
                            isLoading={isLoading}
                        />
                    </motion.div>
                </CardContent>

            </Card>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-4xl border-none p-0">
                    <TestimonialForm<CreateTestimonialData>
                        onSubmit={handleCreateTestimonial}
                        isSubmitting={isSubmitting}
                        onCancel={() => setIsFormOpen(false)}
                    />

                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingTestimonial} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                <DialogContent className="max-w-4xl border-none p-0">
                    {editingTestimonial && (
                        <TestimonialForm<UpdateTestimonialData>
                            initialData={editingTestimonial}
                            onSubmit={handleUpdateTestimonial}
                            isSubmitting={isSubmitting}
                            onCancel={() => setEditingTestimonial(null)}
                        />

                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}