import Dashboard  from "@/components/dashboard";
import Navbar from "@/components/dashboard/navbar";
import { UserSchema } from "@/lib/schemas";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { User } from "@/lib/schemas";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const res = await fetch(
    `https://database.mycloudcodeditor.workers.dev/api/user?id=${user.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch virtual boxes: ${res.statusText}`);
  }

  let userData: User;

  try{
    const rawData = await res.json();
    userData = UserSchema.parse(rawData);
  } catch(error){
    console.log("Failed to validate user data:",error);
    throw new Error("Invalid user data structure");
  }

  return (
    <div>
      <Navbar userData={userData} />
      <Dashboard virtualboxes={userData?.virtualBox} />
    </div>
  );
}
