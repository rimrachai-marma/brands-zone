import { redirect } from "next/navigation";

export default async function Admin() {
  redirect("/vandor/dashboard");
}
