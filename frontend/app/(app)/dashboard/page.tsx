import { Dashboard } from "@/components/dashboard";
import Navbar from "@/components/navbar";
import { VirtualBox } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    redirect("/");
  }

  let data: VirtualBox[] = [];

  try {
    const res = await fetch(
      `https://database.mycloudcodeditor.workers.dev/api/user/virtualbox?id=123`
    );

    console.log(res);

    if (!res.ok) {
      throw new Error(`Failed to fetch virtual boxes: ${res.statusText}`);
    }

    const jsonData = await res.json();
    data = jsonData.virtualBox as VirtualBox[];
  } catch (error) {
    console.error("Error fetching virtual boxes: ", error);
  }

  
  return (
    <div>
      <Navbar />
      <Dashboard virtualboxes={data} />
    </div>
  );
}
