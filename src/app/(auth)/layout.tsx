"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface AuthLayoutProps { 
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignInPage = pathname === "/sign-in";

  return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between">
                    <Image src="/logo.svg" alt="logo" width={152} height={56} />
                    <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
                        <Button variant="secondary">
                            {isSignInPage ? "Sign Up" : "Sign In"}
                        </Button>
                    </Link>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default AuthLayout;
