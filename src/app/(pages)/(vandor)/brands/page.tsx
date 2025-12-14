import { redirect } from "next/navigation";

export default async function Admin() {
  redirect("/brands/dashboard");
}
