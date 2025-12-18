"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StatusAlert from "./status-alert";

interface Props {
  status: "pending" | "verified" | "rejected" | "suspended";
  verified_at?: string | null;
  submitted_at?: string | null;
  rejection_reason?: string | null;
  didit_verification_url?: string | null;

  open: boolean;
}

const StatusAlertModal: React.FC<Props> = (props) => {
  return (
    <Dialog open={props.open}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Brands Verification</DialogTitle>
          <DialogDescription>
            Check your brands verification status and take action if required.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <StatusAlert {...props} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatusAlertModal;
