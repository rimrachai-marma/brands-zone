"use client";

import { Form } from "@/components/ui/form";
import { ProductFormData, productSchema } from "@/schema/products/create";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldPath } from "react-hook-form";
import { BasicInformationSection } from "./form-sections/basic-information-section";
import { ProductImagesSection } from "./form-sections/product-images-section";
import { DescriptionSection } from "./form-sections/description-section";
import { SEOSection } from "./form-sections/seo-section";
import { VariantsSection } from "./form-sections/variants-section";
import { SpecificationsSection } from "./form-sections/specifications-section";
import { InventoryPricingSection } from "./form-sections/inventory-pricing-section";
import DiscountSection from "./form-sections/campaign-section";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import React, { useActionState, useState, useEffect } from "react";
import { AttributesSection } from "./form-sections/attributes-section";
import { Brand, Campaign, Category } from "@/types";
import { createProduct } from "@/lib/actions/products";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { clientEnv } from "@/data/env";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Package,
  Image,
  FileText,
  Search,
  Tag,
  List,
  DollarSign,
  Sparkles,
  Eye,
  Save,
  Trash2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ReviewStep from "./ReviewStep";
import {
  clearFormStateCookie,
  saveFormStateToCookie,
} from "../../_lib/actions";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  brands: Brand[];
  categories: Category[];
  campaigns: Campaign[];
  token: string;
  savedFormData?: ProductFormData | null;
}

type StepConfig = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: ReadonlyArray<FieldPath<ProductFormData>>;
};

const STEPS: StepConfig[] = [
  {
    id: 1,
    title: "Basic Info",
    description: "Product details",
    icon: Package,
    fields: ["name", "brand_id", "category_ids"],
  },
  {
    id: 2,
    title: "Images",
    description: "Product photos",
    icon: Image,
    fields: ["images"],
  },
  {
    id: 3,
    title: "Description",
    description: "Product details",
    icon: FileText,
    fields: ["description", "short_description"],
  },
  {
    id: 4,
    title: "Variants & Attributes",
    description: "Options & pricing",
    icon: Tag,
    fields: ["attributes", "variants"],
  },
  {
    id: 5,
    title: "Specifications",
    description: "Technical specs",
    icon: List,
    fields: ["specifications"],
  },
  {
    id: 6,
    title: "Inventory",
    description: "Stock settings",
    icon: DollarSign,
    fields: ["currency", "low_stock_threshold"],
  },
  {
    id: 7,
    title: "SEO & Campaign",
    description: "Final details",
    icon: Search,
    fields: [
      "meta_title",
      "meta_description",
      "meta_keywords",
      "canonical_url",
      "campaign_id",
    ],
  },
  {
    id: 8,
    title: "Review",
    description: "Final check",
    icon: Eye,
    fields: [],
  },
];

const DEFAULT_FORM_VALUES: ProductFormData = {
  name: "",
  brand_id: "",
  category_ids: [],
  short_description: "",
  description: "",
  images: [{ url: "", alt_text: "", publicId: undefined }],
  currency: "USD",
  low_stock_threshold: 5,
  specifications: {},
  attributes: [],
  variants: [
    {
      sku: "",
      barcode: "",
      attributes: {},
      price: 0,
      sale_price: undefined,
      cost_price: undefined,
      weight: 5,
      weight_unit: "kg",
      width: undefined,
      height: undefined,
      length: undefined,
      dimension_unit: "cm",
    },
  ],
  meta_title: "",
  meta_description: "",
  meta_keywords: [],
  canonical_url: undefined,
  campaign_id: undefined,
  status: "published",
};

export default function MultiStepProductForm({
  brands,
  campaigns,
  categories,
  token,
  savedFormData,
}: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [hasDraftData, setHasDraftData] = useState(false);

  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [brandName, setBrandName] = useState("");

  const [state, formAction, isPending] = useActionState(createProduct, null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: savedFormData || DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    if (savedFormData) {
      setHasDraftData(true);
      toast.success("Draft loaded successfully", {
        icon: "📄",
        duration: 1500,
      });
    }
  }, [savedFormData]);

  // Save form data to cookie
  const saveFormData = async () => {
    try {
      setIsSaving(true);
      const formData = form.getValues();
      await saveFormStateToCookie(formData);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save progress");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle successful submission
  React.useEffect(() => {
    if (state?.status === "error" && state.message && !isPending) {
      toast.error(state.message);

      if (state.data?.duplicates) {
        const duplicateSkus = state.data.duplicates;
        const variants = form.getValues("variants");

        variants.forEach((variant, index) => {
          if (duplicateSkus.includes(variant.sku)) {
            form.setError(`variants.${index}.sku`, {
              type: "manual",
              message: `SKU "${variant.sku}" already exists`,
            });
          }
        });

        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    if (state?.status === "success" && !isPending) {
      clearFormStateCookie().then(() => {
        toast.success(state.message || "Product created");
        router.push("/brands/products");
      });
    }
  }, [state, isPending, router, form]);

  const validateStep = async (stepId: number): Promise<boolean> => {
    const step = STEPS.find((s) => s.id === stepId);
    if (!step || step.fields.length === 0) return true;

    return await form.trigger(step.fields);
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);

    if (isValid) {
      await saveFormData();

      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = async (stepId: number) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (stepId === currentStep + 1) {
      await handleNext();
    }
  };

  const handleClearDraft = async () => {
    if (confirm("Are you sure you want to clear the saved draft?")) {
      await clearFormStateCookie();
      form.reset(DEFAULT_FORM_VALUES);
      setCurrentStep(1);
      setCompletedSteps(new Set());
      setHasDraftData(false);
      toast.success("Draft cleared");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    // Validate all previous steps
    for (let i = 1; i < STEPS.length; i++) {
      const isValid = await validateStep(i);
      if (!isValid) {
        toast.error(`Please complete Step ${i}: ${STEPS[i - 1].title}`);
        setCurrentStep(i);
        return;
      }
    }

    if (data.status === "published") {
      data.published_at = new Date().toISOString();
    }

    React.startTransition(() => {
      formAction(data);
    });
  };

  const progress = (currentStep / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep - 1];

  return (
    <div className="space-y-6">
      {/* Draft indicator */}
      {hasDraftData && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-900 font-medium">
                  Draft loaded from previous session
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearDraft}
                className="text-blue-700 hover:text-blue-900 hover:bg-blue-100"
              >
                <Trash2 className="h-4 w-4" /> <span>Clear Draft</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save indicator */}
      {isSaving && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Spinner className="h-4 w-4" />
          <span className="text-sm">Saving progress...</span>
        </div>
      )}

      {/* Desktop stepper */}
      <div className="hidden lg:block overflow-x-auto">
        <div className="flex gap-1 justify-between">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = currentStep === step.id;
            const isAccessible = step.id <= currentStep;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.id)}
                disabled={!isAccessible && step.id !== currentStep + 1}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-all ${
                  isCurrent
                    ? "border-blue-500 bg-blue-50 shadow-sm"
                    : isCompleted
                    ? "border-green-200 bg-green-50/50 hover:bg-green-100 cursor-pointer"
                    : isAccessible
                    ? "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 cursor-pointer"
                    : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                }`}
              >
                <div
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? "bg-blue-500 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="text-left text-nowrap">
                  <div
                    className={`font-medium text-xs ${
                      isCurrent
                        ? "text-blue-900"
                        : isCompleted
                        ? "text-green-900"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    {step.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile stepper */}
      <div className="lg:hidden">
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((step) => {
            const isCompleted = completedSteps.has(step.id);
            const isCurrent = currentStep === step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(step.id)}
                disabled={step.id > currentStep && step.id !== currentStep + 1}
                className={`w-3 h-3 rounded-full transition-all ${
                  isCurrent
                    ? "bg-blue-500 w-8"
                    : isCompleted
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            );
          })}
        </div>
        <div className="text-center mt-2">
          <div className="font-semibold text-gray-900">
            {currentStepData.title}
          </div>
          <div className="text-sm text-gray-500">
            {currentStepData.description}
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-sm text-right text-muted-foreground">
          Step {currentStep} of {STEPS.length}
        </p>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Content */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <BasicInformationSection
                categories={categories}
                brands={brands}
                form={form}
                setBrandName={setBrandName}
              />
            )}

            {currentStep === 2 && (
              <ProductImagesSection
                uploadEndpoint={`${clientEnv.NEXT_PUBLIC_API_BASE_URL}/vendor/upload/product-image`}
                form={form}
                token={token}
              />
            )}

            {currentStep === 3 && <DescriptionSection form={form} />}

            {currentStep === 4 && (
              <div className="space-y-6">
                <AttributesSection form={form} />
                <VariantsSection brandName={brandName} form={form} />
              </div>
            )}

            {currentStep === 5 && (
              <SpecificationsSection
                form={form}
                newSpecKey={newSpecKey}
                setNewSpecKey={setNewSpecKey}
                newSpecValue={newSpecValue}
                setNewSpecValue={setNewSpecValue}
              />
            )}

            {currentStep === 6 && <InventoryPricingSection form={form} />}

            {currentStep === 7 && (
              <div className="space-y-6">
                <SEOSection form={form} />
                <DiscountSection campaigns={campaigns} form={form} />
              </div>
            )}

            {currentStep === 8 && (
              <ReviewStep
                form={form}
                brands={brands}
                categories={categories}
                campaigns={campaigns}
                onEdit={setCurrentStep}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || isPending}
                  className="min-w-[120px]"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="hidden md:flex items-center gap-2">
                  {STEPS.map((step) => (
                    <div
                      key={step.id}
                      className={`w-2 h-2 rounded-full transition-all ${
                        step.id === currentStep
                          ? "bg-blue-500 w-8"
                          : completedSteps.has(step.id)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isPending || isSaving}
                    className="min-w-[120px]"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        form.setValue("status", "draft");
                        form.handleSubmit(onSubmit)();
                      }}
                      variant="outline"
                      disabled={isPending}
                      className="min-w-[140px]"
                    >
                      <LoadingSwap
                        isLoading={
                          isPending && form.getValues().status !== "published"
                        }
                      >
                        Save as Draft
                      </LoadingSwap>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="min-w-[140px]"
                    >
                      <LoadingSwap
                        isLoading={
                          isPending && form.getValues().status === "published"
                        }
                      >
                        <span className="inline-flex items-center">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Publish Product
                        </span>
                      </LoadingSwap>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
