'use client';

import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Switch} from '@/components/ui/switch';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {campaignFormSchema, CampaignFormData} from '@/schema/campaign';
import {Campaign} from '@/types/campaigns';
import ImageUpload from "@/components/shared/ImageUpload";
import {toast} from "sonner";

interface CampaignFormProps {
    campaign?: Campaign;
    onSubmit: (data: FormData) => Promise<void>;
    isSubmitting: boolean;
    apiError?: string | null;
    fieldErrors?: Record<string, string[]>;
}

export function CampaignForm({campaign, onSubmit, isSubmitting, apiError, fieldErrors}: CampaignFormProps) {
    const [previewImage, setPreviewImage] = useState<string | undefined>(
        campaign?.banner_image_url || undefined
    );

    const form = useForm<CampaignFormData>({
        resolver: zodResolver(campaignFormSchema),
        defaultValues: {
            name: campaign?.name ?? '',
            description: campaign?.description ?? '',
            discount_percentage: campaign?.discount_percentage ?? 0,
            starts_at: campaign?.starts_at
                ? format(new Date(campaign.starts_at), 'yyyy-MM-dd')
                : format(new Date(), 'yyyy-MM-dd'),
            ends_at: campaign?.ends_at
                ? format(new Date(campaign.ends_at), 'yyyy-MM-dd')
                : '',
            is_active: campaign?.is_active ?? true,
            badge_text: campaign?.badge_text ?? '',
        },
    });

    // Add field errors from API to form state
    React.useEffect(() => {
        if (fieldErrors) {
            Object.entries(fieldErrors).forEach(([field, errors]) => {
                form.setError(field as any, {
                    type: 'manual',
                    message: errors[0]
                });
            });
        }
    }, [fieldErrors, form]);

    const handleImageChange = (file?: File) => {
        form.setValue('banner_image', file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(undefined);
        }
    };

    const handleSubmit = async (data: CampaignFormData) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === 'banner_image' && value instanceof File) {
                formData.append(key, value);
            } else if (key === 'is_active') {
                // Convert boolean to string '1' or '0' for FormData
                formData.append(key, value ? '1' : '0');
            } else if (key === 'discount_percentage') {
                // Ensure number is properly formatted
                formData.append(key, String(value || 0));
            } else if (value !== undefined && value !== null) {
                formData.append(key, value.toString());
            }
        });

        try {
            await onSubmit(formData).catch((error) => {
                console.log(error);
            });
        } catch (error: any) {
            console.log(error)
            if (error.response?.data?.errors) {
                const errors = error.response.data.errors;
                Object.entries(errors).forEach(([field, messages]) => {
                    form.setError(field as any, {
                        type: 'manual',
                        message: (messages as string[])[0],
                    });
                });
            }

            // General API error
            else if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            }

            // Fallback
            else {
                toast.error('Something went wrong');
            }
        }
    };

    const handleApiErrors = (error: any) => {
        if (error.response?.data?.errors) {
            const errors = error.response.data.errors;
            Object.entries(errors).forEach(([field, messages]) => {
                if (Array.isArray(messages)) {
                    form.setError(field as any, {
                        type: 'manual',
                        message: messages[0]
                    });
                }
            });
            return true;
        }
        return false;
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* API Error Message */}
                {apiError && (
                    <div className="rounded-md bg-destructive/15 p-4">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <div className="h-5 w-5 text-destructive">!</div>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-destructive">
                                    Please fix the following errors:
                                </h3>
                                <div className="mt-2 text-sm text-destructive">
                                    {apiError}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Campaign Information</CardTitle>
                                <CardDescription>
                                    Enter the basic details of your campaign
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Campaign Name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Summer Sale 2024"
                                                        {...field}
                                                        className={form.formState.errors.name ? 'border-destructive' : ''}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="discount_percentage"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Discount Percentage *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        max={100}
                                                        step={0.1}
                                                        placeholder="20"
                                                        value={field.value ?? ""}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                        className={form.formState.errors.discount_percentage ? 'border-destructive' : ''}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your campaign..."
                                                    className={`min-h-[120px] ${form.formState.errors.description ? 'border-destructive' : ''}`}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Schedule</CardTitle>
                                <CardDescription>
                                    Set the start and end dates for your campaign
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="starts_at"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Start Date *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                    form.formState.errors.starts_at ? 'border-destructive' : ''
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(new Date(field.value), "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) =>
                                                                field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                                                            }
                                                            disabled={(date) => date < new Date()}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="ends_at"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>End Date *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground",
                                                                    form.formState.errors.ends_at ? 'border-destructive' : ''
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(new Date(field.value), "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value ? new Date(field.value) : undefined}
                                                            onSelect={(date) =>
                                                                field.onChange(date ? format(date, 'yyyy-MM-dd') : '')
                                                            }
                                                            disabled={(date) => {
                                                                const startDate = form.getValues('starts_at');
                                                                return date < (startDate ? new Date(startDate) : new Date());
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Banner Image</CardTitle>
                                <CardDescription>
                                    Upload a banner for your campaign
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="banner_image"
                                    render={({field}) => (
                                        <ImageUpload
                                            value={field.value}
                                            onChange={handleImageChange}
                                            previewUrl={previewImage}
                                            error={form.formState.errors.banner_image?.message?.toString()}
                                            label="Campaign Banner"
                                            required={false}
                                            maxSize={2}
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                        />
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="is_active"
                                    render={({field}) => (
                                        <FormItem className="flex flex-row items-center justify-between ">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">
                                                    Active Campaign
                                                </FormLabel>
                                                <FormDescription>
                                                    Make this campaign visible to customers
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    aria-label="Toggle active status"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <div className="sticky top-6 space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div
                                            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                                        Saving...
                                    </>
                                ) : campaign ? (
                                    'Update Campaign'
                                ) : (
                                    'Create Campaign'
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => window.history.back()}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}