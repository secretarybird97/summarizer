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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Page() {




  return (
    <>
    <SiteHeader />
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-32 pb-20 gap-16 sm:p-200 font-[family-name:var(--font-geist-sans)]">    
                <p>SignUp</p>            
            </main>
    </>
  );
}
