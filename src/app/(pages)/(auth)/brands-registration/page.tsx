"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store, FileText, CreditCard } from "lucide-react";
import { VendorFormData, vendorSchema } from "./_lib/schema";
import { useRouter } from "next/navigation";
import { register } from "@/lib/actions/vendor";

const VendorRegistrationForm = () => {
  const [state, formAction, isPending] = React.useActionState(register, null);

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    mode: "onChange",
    defaultValues: {
      shop_name: "",
      description: "",
      business_type: undefined,
      business_address: "",
      business_email: "",
      business_phone: "",
      business_registration_number: "",
      tax_id: "",
      years_in_business: undefined,
      website_url: "",
      bank_account_name: "",
      bank_name: "",
      bank_account_number: "",
      bank_routing_number: "",
      bank_swift_code: "",
    },
  });

  const router = useRouter();

  React.useEffect(() => {
    if (state?.status === "success") {
      router.push("/vendor/profile");
    }
  }, [state]);

  const onSubmit = (data: VendorFormData) => {
    const formData = new FormData();

    formData.append("shop_name", data.shop_name);
    if (data.description) {
      formData.append("description", data.description);
    }
    formData.append("business_type", data.business_type);
    formData.append("business_address", data.business_address);
    formData.append("business_email", data.business_email);
    formData.append("business_phone", data.business_phone);
    formData.append(
      "business_registration_number",
      data.business_registration_number
    );
    formData.append("tax_id", data.tax_id);
    formData.append("years_in_business", data.years_in_business.toString());
    if (data.website_url) {
      formData.append("website_url", data.website_url);
    }

    formData.append("bank_account_name", data.bank_account_name);
    formData.append("bank_name", data.bank_name);
    formData.append("bank_account_number", data.bank_account_number);

    if (data.bank_routing_number) {
      formData.append("bank_routing_number", data.bank_routing_number);
    }
    if (data.bank_swift_code) {
      formData.append("bank_swift_code", data.bank_swift_code);
    }

    React.startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-800">
              Complete Your Vendor Profile
            </CardTitle>
            <CardDescription className="text-lg">
              Fill in your business details to start selling
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {state?.status === "error" && (
              <Alert variant="destructive">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {/* Shop Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Shop Information
                </h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop_name">Shop Name *</Label>
                <Input
                  id="shop_name"
                  {...form.register("shop_name")}
                  placeholder="My Awesome Shop"
                />
                {form.formState.errors.shop_name && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.shop_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Shop Description</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  rows={4}
                  placeholder="Tell customers about your shop..."
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business_email">Business Email *</Label>
                  <Input
                    type="email"
                    id="business_email"
                    {...form.register("business_email")}
                    placeholder="business@example.com"
                  />
                  {form.formState.errors.business_email && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.business_email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_phone">Business Phone *</Label>
                  <Input
                    id="business_phone"
                    {...form.register("business_phone")}
                    placeholder="+1234567890"
                  />
                  {form.formState.errors.business_phone && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.business_phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_address">Business Address *</Label>
                <Textarea
                  id="business_address"
                  {...form.register("business_address")}
                  rows={3}
                  placeholder="Full business address"
                />
                {form.formState.errors.business_address && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.business_address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Legal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Legal Information
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business_registration_number">
                    Business Registration Number *
                  </Label>
                  <Input
                    id="business_registration_number"
                    {...form.register("business_registration_number")}
                    placeholder="REG123456"
                  />
                  {form.formState.errors.business_registration_number && (
                    <p className="text-sm text-red-600">
                      {
                        form.formState.errors.business_registration_number
                          .message
                      }
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID / EIN *</Label>
                  <Input
                    id="tax_id"
                    {...form.register("tax_id")}
                    placeholder="12-3456789"
                  />
                  {form.formState.errors.tax_id && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.tax_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="business_type">Business Type *</Label>
                  <Select
                    onValueChange={(value) =>
                      form.setValue(
                        "business_type",
                        value as
                          | "sole_proprietorship"
                          | "partnership"
                          | "corporation"
                          | "llc"
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_proprietorship">
                        Sole Proprietorship
                      </SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.business_type && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.business_type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="years_in_business">Years in Business *</Label>
                  <Input
                    type="number"
                    id="years_in_business"
                    {...form.register("years_in_business", {
                      valueAsNumber: true,
                    })}
                    placeholder="5"
                  />
                  {form.formState.errors.years_in_business && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.years_in_business.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL (Optional)</Label>
                <Input
                  id="website_url"
                  {...form.register("website_url")}
                  placeholder="https://myshop.com"
                />
                {form.formState.errors.website_url && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.website_url.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bank Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Bank Information
                </h3>
              </div>

              <Alert>
                <AlertDescription>
                  🔒 Your bank information is encrypted and secure. This is
                  required for payment processing.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="bank_name">Bank Name *</Label>
                <Input
                  id="bank_name"
                  {...form.register("bank_name")}
                  placeholder="First National Bank"
                />
                {form.formState.errors.bank_name && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.bank_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_account_name">Account Holder Name *</Label>
                <Input
                  id="bank_account_name"
                  {...form.register("bank_account_name")}
                  placeholder="John Doe"
                />
                {form.formState.errors.bank_account_name && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.bank_account_name.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bank_account_number">Account Number *</Label>
                  <Input
                    type="password"
                    id="bank_account_number"
                    {...form.register("bank_account_number")}
                    placeholder="••••••••"
                  />
                  {form.formState.errors.bank_account_number && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.bank_account_number.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank_routing_number">Routing Number</Label>
                  <Input
                    id="bank_routing_number"
                    {...form.register("bank_routing_number")}
                    placeholder="123456789"
                  />
                  {form.formState.errors.bank_routing_number && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.bank_routing_number.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank_swift_code">
                  SWIFT/BIC Code (For International)
                </Label>
                <Input
                  id="bank_swift_code"
                  {...form.register("bank_swift_code")}
                  placeholder="ABCDUS33XXX"
                />
                {form.formState.errors.bank_swift_code && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.bank_swift_code.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
                className="w-full md:w-auto px-12"
                size="lg"
              >
                {isPending ? "Submitting..." : "Complete Registration"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorRegistrationForm;
