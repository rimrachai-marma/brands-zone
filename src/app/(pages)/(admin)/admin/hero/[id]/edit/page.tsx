'use client'
import { useState, useEffect } from 'react';
import HeroSectionForm from "@/app/(pages)/(admin)/admin/_components/hero-section-form";
import { useRouter,useParams } from "next/navigation";
import { getHeroSection } from "@/lib/actions/hero-section";
import { HeroSection } from "@/types/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function EditHeroSectionPage() {
    const {id} = useParams()
    const router = useRouter();
    const [heroSection, setHeroSection] = useState<HeroSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(id)
    useEffect(() => {
        const fetchHeroSection = async () => {
            try {
                setLoading(true);
                setError(null);

                const heroId=parseInt(id);

                const response = await getHeroSection(heroId);
                console.log(response);
                if (response.success && response.data) {
                    setHeroSection(response.data);
                } else {
                    setError(response.message || "Hero section not found");
                    toast.error(response.message || "Failed to load hero section");
                }
            } catch (err: any) {
                console.error("Error fetching hero section:", err);
                setError(err.message || "An error occurred");
                toast.error("Failed to load hero section");
            } finally {
                setLoading(false);
            }
        };

        fetchHeroSection();
    }, [id]);

    // Show loading skeleton
    if (loading) {
        return (
            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/admin/hero")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Skeleton className="h-8 w-64" />
                    </div>
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Fields Skeleton */}
                    <div className="space-y-6 bg-white p-5 rounded-lg border shadow-sm">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-24 w-full" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <Skeleton className="h-16 w-full" />
                    </div>
                    {/* Image Fields Skeleton */}
                    <div className="space-y-6">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="bg-white p-5 rounded-lg border shadow-sm">
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-32" />
                                    <Skeleton className="h-48 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !heroSection) {
        return (
            <div className="container mx-auto py-6">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/admin/hero")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">Error</h1>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-lg border shadow-sm text-center">
                    <h2 className="text-xl font-semibold text-destructive mb-2">
                        {error || "Hero section not found"}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        The hero section you're trying to edit doesn't exist or you don't have access to it.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/admin/hero")}
                        >
                            Back to Hero Sections
                        </Button>
                        <Button
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/admin/hero")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Hero Section</h1>
                </div>
                <p className="text-muted-foreground ml-11">
                    Update hero section content and images
                </p>
            </div>
            <HeroSectionForm initialData={heroSection} />
        </div>
    );
}