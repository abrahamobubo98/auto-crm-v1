import { getCurrent } from "@/features/auth/queries";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const SignInPage = async () => {
  try {
    const user = await getCurrent();
    
    if (user) {
      redirect('/workspaces');
    }

    return <SignInCard />;
  } catch (error) {
    console.error('Auth check error:', error);
    return <SignInCard />;
  }
};

export default SignInPage;
