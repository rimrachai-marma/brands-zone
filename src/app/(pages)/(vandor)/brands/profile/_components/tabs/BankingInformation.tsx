import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Vendor } from "@/types/vendor";
import { Building2, CreditCard, Save, Shield, User } from "lucide-react";
import { BankingInfoData, bankingInfoSchema } from "../../_lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import update from "@/lib/actions/vendor";
import toast from "react-hot-toast";

interface Props {
  vendor: Vendor;
}

const BankingInformation: React.FC<Props> = ({ vendor }) => {
  const [state, formAction, isPending] = useActionState(update, null);
  const [showAccountNumber, setShowAccountNumber] = React.useState(false);

  const form = useForm<BankingInfoData>({
    resolver: zodResolver(bankingInfoSchema),
    defaultValues: {
      bank_name: vendor.bank_name || "",
      bank_account_name: vendor.bank_account_name || "",
      bank_account_number: vendor.bank_account_number || "",
      bank_routing_number: vendor.bank_routing_number || "",
      bank_swift_code: vendor.bank_swift_code || "",
    },
  });

  const onSubmit = async (data: BankingInfoData) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Bank Account Details</CardTitle>
        <CardDescription>
          Manage your banking information for receiving payments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
          <div className="flex gap-2">
            <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">Secure Information</p>
              <p className="text-sm text-amber-700">
                Your bank details are encrypted and securely stored
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Building2 className="h-4 w-4 inline mr-2" />
                      Bank Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank_account_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <User className="h-4 w-4 inline mr-2" />
                      Account Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Account holder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bank_account_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <CreditCard className="h-4 w-4 inline mr-2" />
                    Account Number *
                  </FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        type={showAccountNumber ? "text" : "password"}
                        placeholder="Enter account number"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAccountNumber(!showAccountNumber)}
                    >
                      {showAccountNumber ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bank_routing_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9-digit routing number"
                        maxLength={9}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank_swift_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SWIFT/BIC Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., BOFAUS3N"
                        maxLength={11}
                        style={{ textTransform: "uppercase" }}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
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
                    Save Banking Info
                  </span>
                </LoadingSwap>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BankingInformation;
