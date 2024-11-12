"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isValidUrl } from "@/lib/utils";
import { Summary } from "@/types/summary";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Typewriter from "../common/typewriter";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

const MIN_TEXT_LENGTH = 30;

const FormSchema = z.object({
  input: z.string().min(1, "Input is required"),
});

export default function Summarizer() {
  const [loading, setLoading] = useState<boolean>(false);
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
          `Text input should be at least ${MIN_TEXT_LENGTH} characters`
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
        throw new Error("Too many requests, please try again later");
      }

      if (!response.ok) {
        throw new Error("Failed to summarize");
      }

      const result: Summary = await response.json();
      setSummary(result.summary_text);
    } catch (error) {
      const message = (error as Error).message;
      setSummary(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-2"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Input</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Insert URL or text for summary"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full h-full align-bottom rounded-none font-bold leading-loose bg-intButton hover:bg-rose-500"
          type="submit"
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Generate summary"}
        </Button>
      </form>

      {/* Skeleton while loading */}
      {loading && <Skeleton className="h-24 w-full mt-4" />}

      {/* Display the summary result */}
      {summary && !loading && (
        <div className="mt-4">
          <Typewriter text={summary} delay={50} />
        </div>
      )}
    </Form>
  );
}
