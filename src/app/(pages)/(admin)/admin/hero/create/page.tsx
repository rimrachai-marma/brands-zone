// app/admin/hero-sections/create/page.tsx
import HeroSectionForm from "@/app/(pages)/(admin)/admin/_components/hero-section-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Hero Section - Admin",
    description: "Create a new hero section",
};

export default function CreateHeroSectionPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Create Hero Section</h1>
                <p className="text-muted-foreground">
                    Add a new hero section with images and content
                </p>
            </div>
            <HeroSectionForm />
        </div>
    );
}