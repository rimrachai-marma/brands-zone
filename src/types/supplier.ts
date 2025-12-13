export interface Supplier {
  id: string;
  vendor_id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  created_at: string | Date;
  updated_at: string | Date;
}
