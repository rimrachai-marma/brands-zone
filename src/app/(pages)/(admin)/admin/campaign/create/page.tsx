'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { CampaignForm } from '@/components/campaign/campaign-form';
import { createCampaign } from '@/lib/actions/admin/campaigns';

export default function CreateCampaignPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        setFieldErrors({});

        try {
           const res = await createCampaign(formData);
            if (res.status==='success') {
                toast.success('Campaign created successfully.');
                router.push('/admin/campaign');
                router.refresh();
            } else {
                setFieldErrors(res.data.errors);
            }
        } catch (error: any) {
            console.error('Create campaign error:', error);
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
                fieldErrors={fieldErrors}
            />
        </div>
    );
}