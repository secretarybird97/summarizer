"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Summary } from "@/types/summary";
import { Trash2Icon } from "lucide-react";
import { ScrollArea } from "../ui/scrollarea";

interface UserSummariesProps {
  summaries: Summary[];
}

// TODO: Implement delete functionality

export default function UserSummaries({ summaries }: UserSummariesProps) {
  return (
    <ScrollArea className="h-96 w-11/12 rounded-md border p-6">
      {summaries.map((summary, index) => (
        <Card
          key={index}
          className="bg-cardsBG w-full h-min border-transparent my-5"
        >
          <CardHeader>
            <CardTitle className="text-NavText font-bold self-center">
              {summary.title}
            </CardTitle>
            <CardDescription className="text-white self-end">
              Generated on {formatDate(summary.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-white">
            <p className="text-justify">{summary.content}</p>
          </CardContent>
          <CardContent className="justify-self-end">
            <Button className="rounded-none bg-black hover:bg-rose-500">
              <Trash2Icon color="white" />{" "}
              <p className="text-white">Delete from history</p>
            </Button>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
