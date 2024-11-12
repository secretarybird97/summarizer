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
import { UserSummary } from "@/types/user_summary";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "../ui/scrollarea";

interface UserSummariesProps {
  summaries: UserSummary[];
}

export default function UserSummaries({ summaries }: UserSummariesProps) {
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>(summaries);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/user/summaries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the summary");
      }

      setUserSummaries((prevSummaries) =>
        prevSummaries.filter((summary) => summary.id !== id)
      );
    } catch (error) {
      console.error("Error deleting the summary:", error);
    }
  };

  return (
    <ScrollArea className="h-96 w-11/12 rounded-md border p-6">
      {userSummaries.map((summary, index) => (
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
            <Button
              className="rounded-none bg-black hover:bg-rose-500"
              onClick={() => handleDelete(summary.id)}
            >
              <Trash2Icon color="white" />{" "}
              <p className="text-white">Delete from history</p>
            </Button>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
}
