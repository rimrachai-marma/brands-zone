"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    getTestimonials,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Search, Filter, User } from "lucide-react";
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
    const [activeTab, setActiveTab] = useState("all");

    // Fetch testimonials
    const fetchTestimonials = async () => {
        try {
            setIsLoading(true);
            const response = await getTestimonials({
                is_active: statusFilter !== "all" ? statusFilter === "active" : undefined,
                search: searchQuery || undefined,
            });
            setTestimonials(response.data?.testimonials || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, [statusFilter, activeTab]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTestimonials();
    };

    const handleCreateTestimonial = async (data: CreateTestimonialData) => {
        try {
            setIsSubmitting(true);
            await createTestimonial(data);
            await fetchTestimonials();
            setIsFormOpen(false);
        } catch (error) {
            console.error("Error creating testimonial:", error);
            alert("Failed to create testimonial");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateTestimonial = async (data: UpdateTestimonialData) => {
        if (!editingTestimonial) return;

        try {
            setIsSubmitting(true);
            await updateTestimonial(editingTestimonial.id, data);
            await fetchTestimonials();
            setEditingTestimonial(null);
        } catch (error) {
            console.error("Error updating testimonial:", error);
            alert("Failed to update testimonial");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteTestimonial = async (id: string) => {
        try {
            await deleteTestimonial(id);
            await fetchTestimonials();
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial");
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

    const filteredTestimonials = testimonials.filter((testimonial) => {
        if (activeTab === "all") return true;
        if (activeTab === "active") return testimonial.is_active;
        if (activeTab === "inactive") return !testimonial.is_active;
        return true;
    });

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
                    <div className="grid gap-4 md:grid-cols-3">
                        <form onSubmit={handleSearch} className="md:col-span-2">
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
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Testimonials</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="space-y-4">
                    {/* Stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{testimonials.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active</CardTitle>
                                <User className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {testimonials.filter(t => t.is_active).length}
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                                <Filter className="h-4 w-4 text-yellow-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {testimonials.length > 0
                                        ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                                        : "0.0"}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TestimonialsTable
                            testimonials={filteredTestimonials}
                            onEdit={setEditingTestimonial}
                            onDelete={handleDeleteTestimonial}
                            onToggleStatus={handleToggleStatus}
                            isLoading={isLoading}
                        />
                    </motion.div>
                </TabsContent>
            </Tabs>

            {/* Create Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Add New Testimonial</DialogTitle>
                        <DialogDescription>
                            Create a new customer testimonial
                        </DialogDescription>
                    </DialogHeader>
                    <TestimonialForm
                        onSubmit={handleCreateTestimonial}
                        isSubmitting={isSubmitting}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={!!editingTestimonial} onOpenChange={(open) => !open && setEditingTestimonial(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Edit Testimonial</DialogTitle>
                        <DialogDescription>
                            Update testimonial details
                        </DialogDescription>
                    </DialogHeader>
                    {editingTestimonial && (
                        <TestimonialForm
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