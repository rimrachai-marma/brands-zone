import { Vendor } from "./vendor";

export type UserRole = "customer" | "admin" | "vendor";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  avatar: string | null;
  role: UserRole;
  newsletter_subscribed: boolean;
  sms_notifications: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;

  vendor?: Vendor;
}
