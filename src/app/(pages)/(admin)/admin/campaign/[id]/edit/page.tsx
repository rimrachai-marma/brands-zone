'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CampaignForm } from '@/components/campaign/campaign-form';
import { getCampaign, updateCampaign } from '@/lib/actions/admin/campaigns';
import { Campaign } from '@/types/campaigns';

export default function EditCampaignPage() {
    const params = useParams();
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetchCampaign();
    }, [params.id]);

    const fetchCampaign = async () => {
        if (!params.id) return;

        setIsLoading(true);
        try {
            const response = await getCampaign(params.id as string);
            setCampaign(response.data);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to load campaign',
                variant: 'destructive',
            });
            router.push('/admin/campaign');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        if (!params.id) return;

        setIsSubmitting(true);
        setApiError(null);
        setFieldErrors({});

        try {
            await updateCampaign(params.id as string, formData);
            toast({
                title: 'Success',
                description: 'Campaign updated successfully',
            });
            router.push('/admin/campaigns');
            router.refresh();
        } catch (error: any) {
            console.error('Update campaign error:', error);

            if (error.response?.data?.message) {
                setApiError(error.response.data.message);
            }

            if (error.response?.data?.errors) {
                setFieldErrors(error.response.data.errors);
                toast({
                    title: 'Validation Error',
                    description: 'Please check the form for errors',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: error.message || 'Failed to update campaign',
                    variant: 'destructive',
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">Loading campaign...</div>
            </div>
        );
    }

    if (!campaign) {
        return null;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Campaign</h1>
                <p className="text-muted-foreground">
                    Update campaign details and settings
                </p>
            </div>

            <CampaignForm
                campaign={campaign}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                apiError={apiError}
                fieldErrors={fieldErrors}
            />
        </div>
    );
}