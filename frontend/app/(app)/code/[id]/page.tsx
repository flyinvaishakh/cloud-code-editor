import Navbar from "@/components/editor/navbar";
import { UserSchema } from "@/lib/schemas";
import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import type { User } from "@/lib/schemas";


const CodeEditor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const userRes = await fetch(
    `https://database.mycloudcodeditor.workers.dev/api/user?id=${user.id}`
  );

  if (!userRes.ok) {
    throw new Error("Failed to fetch user data in code/[id]");
  }

  let userData: User;

  try{
    const rawData = await userRes.json();
     userData = UserSchema.parse(rawData);
  } catch (error){
    console.log("USer data validation failed:",error);
    throw new Error("Invalid user data structure")
  }

  return (
    <div className="flex w-screen flex-col h-screen bg-background">
      <Navbar userData={userData} />
      <div className="w-screen flex grow">
        <CodeEditor />
      </div>
    </div>
  );
}
