"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleRegister(values: z.infer<typeof SignupFormSchema>) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log(values);
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      console.log("User successfully registered");
      window.location.href = "/about";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className="grid items-center justify-items-center pb-20 font-[family-name:var(--font-geist-sans)] mt-16">
        <Card className="bg-cardsBG w-3/12 h-min border-NavText">
          <CardHeader>
            <CardTitle className="text-NavText font-bold">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="space-y-8 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">
                        Email
                      </FormLabel>
                      <FormControl className="text-white">
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-white"
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold">
                        Confirm your password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-white"
                          type="password"
                          placeholder="Confirm your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full h-full align-bottom font-bold leading-loose bg-intButton hover:bg-rose-500"
                  type="submit"
                >
                  Sign up
                </Button>
              </form>
            </Form>
            <div className="flex justify-end mt-4 w-full overflow-hidden">
              <Button variant="link" className="text-sm whitespace-nowrap">
                <a href="/login">Already have an account?</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
