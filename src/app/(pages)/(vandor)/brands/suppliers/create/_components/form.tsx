"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SupplierFormData, supplierSchema } from "../_lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { LoadingSwap } from "@/components/ui/loading-swap";
import React from "react";
import { create } from "@/lib/actions/supplier";
import toast from "react-hot-toast";

const Form: React.FC = () => {
  const router = useRouter();
  const [state, formAction, isPending] = React.useActionState(create, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema),
    defaultValues: {
      company_name: "",
      contact_person: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: SupplierFormData) => {
    const formData = new FormData();

    formData.append("company_name", data.company_name);
    formData.append("contact_person", data.contact_person);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    React.startTransition(() => {
      formAction(formData);
    });
  };

  React.useEffect(() => {
    if (state?.status) {
      if (state.status === "error") {
        toast.error(state.message);
      }

      if (state.status === "success") {
        router.push("/brands/suppliers");
      }
    }
  }, [state, router]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                placeholder="ABC Electronics Supply"
                {...register("company_name")}
              />

              {errors.company_name && (
                <p className="text-sm text-red-600">
                  {errors.company_name.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_person">Contact Person *</Label>
              <Input
                id="contact_person"
                placeholder="John Smith"
                {...register("contact_person")}
              />
              {errors.contact_person && (
                <p className="text-sm text-red-600">
                  {errors.contact_person.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@supplier.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Street Address *</Label>
            <Textarea
              id="address"
              placeholder="123 Industrial Blvd, Suite 100"
              {...register("address")}
              rows={3}
            />
            {errors.address && (
              <p className="text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
          <LoadingSwap isLoading={isPending}>
            <span className="inline-flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Create Supplier</span>
            </span>
          </LoadingSwap>
        </Button>
      </div>
    </div>
  );
};

export default Form;
