import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { useActionState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { PasswordData, passwordSchema } from "../../_lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingSwap } from "@/components/ui/loading-swap";
import updatePassword from "@/lib/actions/auth";
import toast from "react-hot-toast";

const SecurityInformation: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [state, formAction, isPending] = useActionState(updatePassword, null);

  const form = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: PasswordData) => {
    React.startTransition(() => {
      formAction(data);
    });
  };


  React.useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    }

    if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  const getPasswordStrength = (
    password: string
  ): { strength: string; color: string; width: string } => {
    if (!password) return { strength: "", color: "", width: "0%" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 1)
      return { strength: "Weak", color: "bg-red-500", width: "25%" };
    if (score === 2)
      return { strength: "Fair", color: "bg-orange-500", width: "50%" };
    if (score === 3)
      return { strength: "Good", color: "bg-yellow-500", width: "75%" };
    return { strength: "Strong", color: "bg-green-500", width: "100%" };
  };

  const newPassword = useWatch({
    control: form.control,
    name: "password",
  }) as string | undefined;

  const passwordStrength = getPasswordStrength(newPassword || "");

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    {newPassword && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">
                            Password strength:
                          </span>
                          <span
                            className={`font-medium ${
                              passwordStrength.strength === "Strong"
                                ? "text-green-600"
                                : passwordStrength.strength === "Good"
                                ? "text-yellow-600"
                                : passwordStrength.strength === "Fair"
                                ? "text-orange-600"
                                : "text-red-600"
                            }`}
                          >
                            {passwordStrength.strength}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: passwordStrength.width }}
                          />
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" disabled={isPending}>
                  <LoadingSwap isLoading={isPending}>
                    Update Password
                  </LoadingSwap>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account. Require a
            verification code when logging in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0.5">
            <p className="font-medium text-slate-900">Enable 2FA</p>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable_2fa" className="text-slate-600">
                Secure your account with two-factor authentication
              </Label>
              <Switch id="enable_2fa" />
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default SecurityInformation;
