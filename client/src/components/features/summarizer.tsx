"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { isValidUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Typewriter from "../common/typewriter";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

const MIN_TEXT_LENGTH = 30;
const MAX_TEXT_LENGTH = 3700;

const FormSchema = z.object({
  input: z.string().min(1, "Input is required"),
});

export default function Summarizer() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setSummary(null);

    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      const requestData = {
        ...data,
        ip_address: ipAddress,
      };

      const isUrl = isValidUrl(data.input);
      if (!isUrl && data.input.length < MIN_TEXT_LENGTH) {
        throw new Error(
          `Text input should be at least ${MIN_TEXT_LENGTH} characters`,
        );
      }
      if (!isUrl && data.input.length > MAX_TEXT_LENGTH) {
        throw new Error(
          `Text input should be at most ${MAX_TEXT_LENGTH} characters`,
        );
      }
      const endpoint = isUrl ? "/api/summarize/article" : "/api/summarize/text";

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.status === 429) {
        throw new Error(
          "You have reached your daily limit. Please try again later.",
        );
      }

      if (!response.ok) {
        throw new Error("Server error. Please try again later.");
      }

      const result = await response.json();
      setSummary(result.summary_text);
    } catch (error) {
      toast({
        title: "Failed to summarize",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What do you want to summarize?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Insert any URL or text for summary"
                    className="resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full font-bold bg-intButton hover:bg-rose-400"
            type="submit"
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Generate summary"}
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="mt-8">
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}

      {summary && !loading && (
        <>
          <Separator className="mt-8" />
          <div className="mt-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Summary
            </h2>
            <ScrollArea className="h-auto rounded-md p-4">
              <Typewriter text={summary} delay={15} />
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}
