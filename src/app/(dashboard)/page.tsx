import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";

export default async function Home() {
  try {
    const user = await getCurrent();
    if (!user) {
      redirect("/sign-in");
    }

    const workspaces = await getWorkspaces();
    if (!workspaces || workspaces.total === 0) {
      redirect("/workspaces/create");
    }
    
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  } catch (error) {
    // If any error occurs, redirect to sign in
    redirect("/sign-in");
  }
}
