import Dashboard from "@/components/sections/Dashboard";
import { serverURL } from "@/lib/exportEnv";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/dashboard")
  return (
    <div className="flex justify-center items-center h-screen text-foreground">
     Redirecting to DashBoard...
    </div>
  );
}
