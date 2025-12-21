// app/admin/hero-sections/page.tsx
import HeroSectionList from "@/app/(pages)/(admin)/admin/_components/hero-section-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hero Sections - Admin",
    description: "Manage hero sections",
};

export default function HeroSectionsPage() {
    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Hero Sections</h1>
                <p className="text-muted-foreground">
                    Manage hero sections with images, titles, and CTAs
                </p>
            </div>
            <HeroSectionList />
        </div>
    );
}