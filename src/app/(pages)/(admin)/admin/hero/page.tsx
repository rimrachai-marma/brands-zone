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
            <HeroSectionList />
        </div>
    );
}