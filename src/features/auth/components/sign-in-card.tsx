"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem,
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useLogin } from "../api/use-login";


export const SignInCard = () => {
    const  { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    }); 

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({ json: values });
        console.log(values);
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl font-bold">
                    Welcome to taskMatic!
                </CardTitle>
            </CardHeader>
            <div className="px-7 mb-2">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>

                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        type="email"
                                        disabled={isPending}
                                        placeholder="Enter your email"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        type="password"
                                        disabled={isPending}
                                        placeholder="Enter your password"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isPending}
                            size="lg"
                            className="w-full"
                            >
                            Sign In
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button 
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isPending}
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button 
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isPending}
                >
                    <FaGithub className="mr-2 size-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Don&apos;t have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700">&nbsp; Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
};