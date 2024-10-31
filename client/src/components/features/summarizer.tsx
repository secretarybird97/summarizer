"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Typewriter from "../common/typewriter";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  input: z.string(),
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
      const response = await fetch("/api/summary", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize");
      }

      const result = await response.json();
      setSummary(result.data.summary_text);
    } catch (error) {
      console.log(error);
      setSummary("Failed to generate summary");
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
                  placeholder="Insert text for summary"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Summarizing..." : "Submit"}
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
