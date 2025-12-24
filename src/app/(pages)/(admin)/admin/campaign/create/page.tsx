'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CampaignForm } from '@/components/campaign/campaign-form';
import { createCampaign } from '@/lib/actions/admin/campaigns';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setApiError(null);
        setFieldErrors({});

        try {
            await createCampaign(formData);
            toast.success('Campaign created successfully.');
            router.push('/admin/campaign');
            router.refresh();
        } catch (error: any) {
            console.error('Create campaign error:', error);

            if (error.response?.data?.message) {
                setApiError(error.response.data.message);
            }

            if (error.response?.data?.errors) {
                setFieldErrors(error.response.data.errors);
                // Also show a toast for field errors
                toast.error(error.response.data.message);
            } else {
                toast.error(error.response.data.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
                <p className="text-muted-foreground">
                    Set up a new promotional campaign with discounts
                </p>
            </div>

            <CampaignForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                apiError={apiError}
                fieldErrors={fieldErrors}
            />
        </div>
    );
}