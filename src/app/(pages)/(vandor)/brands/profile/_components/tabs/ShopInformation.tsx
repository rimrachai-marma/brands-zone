import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Vendor } from "@/types/vendor";
import { formatCurrency } from "@/utils/formaters";
import {
  CreditCard,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  Star,
  Store,
  TrendingUp,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ShopInfoData, shopInfoSchema } from "../../_lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import React, { useActionState, useEffect } from "react";
import update from "@/lib/actions/vendor";
import toast from "react-hot-toast";

interface Props {
  vendor: Vendor;
}

const ShopInformation: React.FC<Props> = ({ vendor }) => {
  const [state, formAction, isPending] = useActionState(update, null);

  const form = useForm<ShopInfoData>({
    resolver: zodResolver(shopInfoSchema),
    defaultValues: {
      shop_name: vendor.shop_name || "",
      description: vendor.description || "",
      business_email: vendor.business_email || "",
      business_phone: vendor.business_phone || "",
      business_address: vendor.business_address || "",
      website_url: vendor.website_url || "",
    },
  });

  const onSubmit = async (data: ShopInfoData) => {
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
          <CardTitle>Shop Details</CardTitle>
          <CardDescription>
            Manage your shop information and branding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="shop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Store className="h-4 w-4 inline mr-2" />
                      Shop Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="My Amazing Shop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell customers about your shop..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="business_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Mail className="h-4 w-4 inline mr-2" />
                        Business Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@myshop.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="business_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Phone className="h-4 w-4 inline mr-2" />
                        Business Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="business_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Business Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="123 Main St, City, Country"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Globe className="h-4 w-4 inline mr-2" />
                      Website URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.yourwebsite.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" disabled={isPending}>
                  <LoadingSwap isLoading={isPending}>
                    <span className="flex">
                      <Save className="h-4 w-4 mr-2" />
                      Save Shop Info
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
          <CardTitle>Shop Performance</CardTitle>
          <CardDescription>Your shop statistics and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">Average Rating</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">4.7 / 5.0</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Total Sales</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">1,050</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(50000, "USD")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopInformation;
