import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Vendor } from "@/types/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, FileText, Percent, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { BusinessInfoData, businessInfoSchema } from "../../_lib/schemas";
import React, { useActionState, useEffect } from "react";
import { LoadingSwap } from "@/components/ui/loading-swap";
import update from "@/lib/actions/vendor";
import toast from "react-hot-toast";

interface Props {
  vendor: Vendor;
}

const BusinessInformation: React.FC<Props> = ({ vendor }) => {
  const [state, formAction, isPending] = useActionState(update, null);

  const form = useForm<BusinessInfoData>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      business_type: vendor.business_type || undefined,
      years_in_business: vendor.years_in_business || undefined,
      business_registration_number: vendor.business_registration_number || "",
      tax_id: vendor.tax_id || "",
    },
  });

  const onSubmit = async (data: BusinessInfoData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    }

    if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Legal Information</CardTitle>
          <CardDescription>
            Manage your business registration and tax details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 items-end">
                <FormField
                  control={form.control}
                  name="business_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Building2 className="h-4 w-4 inline mr-2" />
                        Business Type *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sole_proprietorship">
                            Sole Proprietorship
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="corporation">
                            Corporation
                          </SelectItem>
                          <SelectItem value="llc">LLC</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="years_in_business"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years in Business</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="business_registration_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FileText className="h-4 w-4 inline mr-2" />
                        Business Registration Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter registration number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tax_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <FileText className="h-4 w-4 inline mr-2" />
                        Tax ID / EIN
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="XX-XXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button disabled={isPending}>
                  <LoadingSwap isLoading={isPending}>
                    <span className="inline-flex">
                      <Save className="h-4 w-4 mr-2" />
                      Save Business Info
                    </span>
                  </LoadingSwap>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Settings</CardTitle>
          <CardDescription>
            Platform commission rate for your sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Percent className="h-5 w-5 text-slate-600" />
                  <Label className="text-lg font-semibold">
                    Current Commission Rate
                  </Label>
                </div>
                <p className="text-sm text-slate-600">
                  This rate is set by the platform administrator
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  {vendor.commission_rate}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessInformation;
