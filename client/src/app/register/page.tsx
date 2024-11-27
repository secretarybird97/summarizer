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
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { register } from "../actions";

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
  passwordConfirmation: z.string(),
});

export default function Page() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function handleRegister(values: z.infer<typeof SignupFormSchema>) {
    try {
      if (values.password !== values.passwordConfirmation) {
        toast({
          title: "Failed to register",
          description: "Passwords do not match.",
          variant: "destructive",
        });
        return;
      }
      await register(values);
      router.push("/login");
      toast({
        title: "Registered",
        description: "You have been successfully registered in.",
      });
    } catch (error) {
      toast({
        title: "Failed to register",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid items-center justify-items-center mt-16 px-4">
      <Card className="w-full max-w-lg mx-auto">
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
                    <FormLabel className="font-bold">Email</FormLabel>
                    <FormControl>
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
                    <FormLabel className="font-bold">Password</FormLabel>
                    <FormControl>
                      <Input
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
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Confirm your password
                    </FormLabel>
                    <FormControl>
                      <Input
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
            <Button
              variant="link"
              className="text-sm whitespace-nowrap text-NavText"
            >
              <Link href="/login">Already have an account?</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
