
import HeroSectionForm from "@/app/(pages)/(admin)/admin/_components/hero-section-form";
import { notFound } from "next/navigation";
import {getHeroSection} from "@/lib/actions/hero-section";

interface EditHeroSectionPageProps {
    params: {
        id: string;
    };
}


export default async function EditHeroSectionPage({params}: EditHeroSectionPageProps) {
    const { id } = params;
    const response = await getHeroSection(parseInt(id));

    if (!response.data) {
        notFound();
    }

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Edit Hero Section</h1>
                <p className="text-muted-foreground">
                    Update hero section content and images
                </p>
            </div>
            <HeroSectionForm initialData={response.data} />
        </div>
    );
}