import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";

export const dynamic = 'force-dynamic';

const SignInPage = async () => {
  try {
    const user = await getCurrent();
    
    if (user) {
      redirect('/workspaces');
    }

<<<<<<< HEAD
    return <SignInCard />;
  } catch (error) {
    console.error('Auth check error:', error);
    return <SignInCard />;
  }
=======
  console.log({ user })

  if (user) redirect("/");

  return <SignInCard />
>>>>>>> temp-branch
};
 
export default SignInPage;
