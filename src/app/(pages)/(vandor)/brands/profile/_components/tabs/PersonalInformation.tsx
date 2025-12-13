import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import { Vendor } from "@/types/vendor";
import { formatDate } from "@/utils/formaters";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Save, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { PersonalInfoData, personalInfoSchema } from "../../_lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useActionState, useEffect } from "react";
import { LoadingSwap } from "@/components/ui/loading-swap";
import updateUser from "@/lib/actions/user";
import toast from "react-hot-toast";

interface Props {
  user: User;
  vendor: Vendor;
}

const PersonalInformation: React.FC<Props> = ({ user, vendor }) => {
  const [state, formAction, isPending] = useActionState(updateUser, null);

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    },
  });
  const onSubmit = async (data: PersonalInfoData) => {
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

  const handleVerifyEmail = () => {
    // TODO: Implement email verification
    console.log("Verify email clicked");
  };

  const handleVerifyPhone = () => {
    // TODO: Implement phone verification
    console.log("Verify phone clicked");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal contact details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <UserIcon className="h-4 w-4 inline mr-2" />
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email Address *
                      </FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        {user.email_verified_at ? (
                          <Badge
                            variant="default"
                            className="shrink-0 bg-green-600"
                          >
                            Verified
                          </Badge>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="default"
                            onClick={handleVerifyEmail}
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          {...field}
                        />
                      </FormControl>
                      {user.phone_verified_at ? (
                        <Badge
                          variant="default"
                          className="shrink-0 bg-green-600"
                        >
                          Verified
                        </Badge>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          size="default"
                          onClick={handleVerifyPhone}
                          disabled={!field.value}
                        >
                          Verify
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" disabled={isPending}>
                  <LoadingSwap isLoading={isPending}>
                    <span className="inline-flex">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
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
          <CardTitle>Account Information</CardTitle>
          <CardDescription>View your account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-slate-600">User ID</Label>
              <p className="text-sm font-mono text-slate-900 mt-1">{user.id}</p>
            </div>
            <div>
              <Label className="text-slate-600">Vendor ID</Label>
              <p className="text-sm font-mono text-slate-900 mt-1">
                {vendor.id}
              </p>
            </div>
            <div>
              <Label className="text-slate-600">Role</Label>
              <p className="text-sm text-slate-900 mt-1 capitalize">
                {user.role}
              </p>
            </div>
            <div>
              <Label className="text-slate-600">Account Status</Label>
              <p className="text-sm text-slate-900 mt-1 capitalize">
                {vendor.status}
              </p>
            </div>
            <div>
              <Label className="text-slate-600">Account Created</Label>
              <p className="text-sm text-slate-900 mt-1">
                {formatDate(user.created_at)}
              </p>
            </div>
            <div>
              <Label className="text-slate-600">Verified On</Label>
              <p className="text-sm text-slate-900 mt-1">
                {vendor.verified_at ? (
                  formatDate(vendor.verified_at)
                ) : (
                  <span className="text-amber-600 font-medium">
                    Not verified yet
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInformation;
