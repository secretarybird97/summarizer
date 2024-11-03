"use client";

import SiteHeader from "@/components/layout/siteHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/layout/footer";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      console.log("Logged in");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <SiteHeader />
    <main className="grid items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
    <Card className="bg-cardsBG w-3/12 h-min border-NavText">
    <CardHeader>
        <CardTitle className="text-NavText font-bold">Welcome Back!</CardTitle>
    </CardHeader>
    <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold">Email</FormLabel>
              <FormControl className="text-white">
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-bold">Password</FormLabel>
              <FormControl >
                <Input className="text-white" type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <Button className="w-full h-full align-bottom rounded-none font-bold leading-loose bg-intButton hover:bg-rose-500" type="submit">Log in</Button>
      </form>
    </Form>
    <div className="grid grid-cols-2 ">
      <Button variant="link">
        <a href="/register">Don't have an account?</a>
      </Button>
      <Button variant="link">
      <a href="/recover">Forgot your password?</a>
      </Button>
    </div>
    
    </CardContent>
    </Card>
    </main>
    <Footer />
    </>
  );
}
