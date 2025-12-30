"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialFormSchema, TestimonialFormValues } from "@/schema";
import { CreateTestimonialData, UpdateTestimonialData, Testimonial } from "@/types";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Upload, X, Save, User, Briefcase, MessageSquare } from "lucide-react";
import {Switch} from "@/components/ui/switch";

interface TestimonialFormProps<T> {
    onSubmit: (data: T) => Promise<void>;
    initialData?: Testimonial | null;
    isSubmitting?: boolean;
    onCancel?: () => void;
}


export default function TestimonialForm<T extends CreateTestimonialData | UpdateTestimonialData>({
                                                                                                     onSubmit,
                                                                                                     initialData,
                                                                                                     isSubmitting = false,
                                                                                                     onCancel,
                                                                                                 }: TestimonialFormProps<T>) {

    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);

    const form = useForm<TestimonialFormValues>({
        resolver: zodResolver(testimonialFormSchema),
        defaultValues: {
            name: "",
            rating: 5,
            designation: "",
            message: "",
            is_active: true,
            avatar: undefined,
        },
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name,
                rating: initialData.rating,
                designation: initialData.designation || "",
                message: initialData.message,
                is_active: initialData.is_active,
                avatar: initialData.avatar || undefined,
            });
            if (initialData.avatar) {
                setAvatarPreview(initialData.avatar_url);
            }
        }
    }, [initialData, form]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
                form.setValue("avatar", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setAvatarPreview(undefined);
        form.setValue("avatar", undefined);
    };

    const handleSubmit = async (values: TestimonialFormValues) => {
        await onSubmit(values as T);
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>
                    {initialData ? "Edit Testimonial" : "Add New Testimonial"}
                </CardTitle>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <CardContent className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="space-y-4">
                            <FormLabel>Profile Picture</FormLabel>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="shrink-0">
                                    {avatarPreview ? (
                                        <div className="relative">
                                            <Avatar className="w-32 h-32">
                                                <AvatarImage src={avatarPreview} alt="Preview" className={'object-cover object-center'}/>
                                                <AvatarFallback className="text-2xl">
                                                    {form.watch("name")?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="destructive"
                                                className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
                                                onClick={removeAvatar}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Label htmlFor="avatar" className="cursor-pointer">
                                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground/25 hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 bg-muted/50">
                                                <Upload className="w-8 h-8 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">Upload Photo</span>
                                            </div>
                                            <Input
                                                id="avatar"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleAvatarChange}
                                            />
                                        </Label>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Upload a profile picture (optional)
                                    </p>
                                    <p className="text-xs text-muted-foreground mb-4">
                                        Recommended: Square image, JPG or PNG format, max 2MB
                                    </p>
                                    {!avatarPreview && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById("avatar")?.click()}
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Choose File
                                        </Button>
                                    )}
                                    {form.formState.errors.avatar && (
                                        <p className="text-sm text-destructive mt-2">
                                            {form.formState.errors.avatar.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <User className="w-4 h-4 inline mr-2" />
                                        Full Name *
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Designation */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Briefcase className="w-4 h-4 inline mr-2" />
                                        Designation / Role
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Software Engineer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rating */}
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating *</FormLabel>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Button
                                                    key={star}
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="p-1 h-auto"
                                                    onClick={() => field.onChange(star)}
                                                >
                                                    <Star
                                                        className={`w-8 h-8 ${
                                                            star <= field.value
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : " fill-gray-300 text-gray-300"
                                                        }`}
                                                    />
                                                </Button>
                                            ))}
                                        </div>
                                        <FormControl className="hidden">
                                            <Input type="number" {...field} />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <MessageSquare className="w-4 h-4 inline mr-2" />
                                        Testimonial Message *
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Share your experience with our product/service..."
                                            className="min-h-[120px] resize-none"
                                            maxLength={500}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="flex justify-between">
                                        <FormDescription>
                                            Share your honest feedback
                                        </FormDescription>
                                        <span className={`text-sm ${
                                            field.value.length >= 490 ? "text-destructive" : "text-muted-foreground"
                                        }`}>
                      {field.value.length}/500
                    </span>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Status */}
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

                    <CardFooter className="flex justify-between pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    {initialData ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    {initialData ? "Update Testimonial" : "Create Testimonial"}
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}