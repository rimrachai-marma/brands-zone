"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { verfy } from "@/lib/actions/vendor";
import { formatDate } from "@/utils/formaters";
import { AlertCircle, CheckCircle, Clock, Shield, XCircle } from "lucide-react";
import React from "react";

interface Props {
  status: "pending" | "verified" | "rejected" | "suspended";
  verified_at?: string | null;
  submitted_at?: string | null;
  rejection_reason?: string | null;
  didit_verification_url?: string | null;
}

const StatusAlert: React.FC<Props> = ({
  status,
  verified_at,
  submitted_at,
  rejection_reason,
  didit_verification_url,
}) => {
  const [state, action, isPending] = React.useActionState(verfy, null);

  const handleStartVerification = async () => {
    React.startTransition(() => {
      action();
    });
  };

  console.log(state);

  return (
    <>
      {status === "pending" && !submitted_at && !verified_at && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-5 w-5 text-yellow-600" />
          <AlertTitle className="text-yellow-900 font-semibold">
            Not verified
          </AlertTitle>
          <AlertDescription className="text-yellow-800">
            Your vendor account is not verified. Complete the verification
            process to start selling on the platform.
            <div className="mt-3">
              <Button
                onClick={handleStartVerification}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <LoadingSwap isLoading={isPending}>
                  <span className="flex">
                    <Shield className="h-4 w-4 mr-2" />
                    Complete Verification
                  </span>
                </LoadingSwap>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {status === "pending" &&
        submitted_at &&
        !verified_at &&
        didit_verification_url && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <Clock className="h-5 w-5 text-yellow-600" />
            <AlertTitle className="text-yellow-900 font-semibold">
              Verification Pending
            </AlertTitle>
            <AlertDescription className="text-yellow-800">
              Your vendor account is pending verification. Complete the
              verification process to start selling on the platform.
              <div className="mt-3">
                <Button asChild className="bg-yellow-600 hover:bg-yellow-700">
                  <a
                    href={didit_verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Complete Verification
                  </a>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

      {status === "rejected" && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">
            Application Rejected
          </AlertTitle>
          <AlertDescription className="text-red-800">
            {rejection_reason ||
              "Your vendor application has been rejected. Please contact support for more information."}
            <div className="mt-3">
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Contact Support
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {status === "suspended" && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">
            Account Suspended
          </AlertTitle>
          <AlertDescription className="text-red-800">
            Your vendor account has been suspended. You cannot process orders or
            list new products until this is resolved.
            <div className="mt-3">
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Contact Support
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* {status === "verified" && verified_at && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-900 font-semibold">
            Account Verified
          </AlertTitle>
          <AlertDescription className="text-green-800">
            Your vendor account is verified and active. You can start selling on
            the platform. Verified on&nbsp;
            {formatDate(verified_at)}
          </AlertDescription>
        </Alert>
      )} */}
    </>
  );
};

export default StatusAlert;
