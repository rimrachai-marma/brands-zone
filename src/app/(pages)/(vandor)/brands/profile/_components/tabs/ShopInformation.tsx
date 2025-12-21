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
import { Vendor, VendorRating, VendorStats } from "@/types/vendor";
import {
  CreditCard,
  Globe,
  Mail,
  MapPin,
  Package,
  Phone,
  Save,
  Star,
  Store,
  ThumbsUp,
  TrendingUp,
  Truck,
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
  vendorRating: VendorRating;
  vendorStats: VendorStats;
}

const ShopInformation: React.FC<Props> = ({
  vendor,
  vendorStats,
  vendorRating,
}) => {
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
            {/* Average Rating + Total Reviews */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Star className="h-4 w-4" />
                <span className="text-sm font-medium">Average Rating</span>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold text-slate-900">
                  {vendorRating.average}
                </p>
                <span className="text-sm text-slate-500">
                  / 5.0 · {vendorRating.total_reviews} reviews
                </span>
              </div>
            </div>

            {/* Positive Feedback */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-sm font-medium">Positive Feedback</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {vendorRating.positive_percentage}%
              </p>
            </div>

            {/* Total Sales */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Total Sales</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {vendorStats.products_sold}
              </p>
            </div>

            {/* Products */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Package className="h-4 w-4" />
                <span className="text-sm font-medium">Products</span>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {vendorStats.products_count}
              </p>
            </div>

            {/* Avg Shipping Time */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Truck className="h-4 w-4" />
                <span className="text-sm font-medium">Avg Shipping Time</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {vendorStats.avg_ship_time ?? "N/A"}
              </p>
            </div>

            {/* Total Revenue */}
            <div className="bg-slate-50 p-4 rounded-lg border">
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <CreditCard className="h-4 w-4" />
                <span className="text-sm font-medium">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-green-600">N/A</p>
              <span className="text-sm text-slate-500">Not implimented</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopInformation;
