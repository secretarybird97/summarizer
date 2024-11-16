"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { UserSummary } from "@/types/user-summary";
import { Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea } from "../ui/scrollarea";

interface UserSummariesProps {
  summaries: UserSummary[];
}

export default function UserSummaries({ summaries }: UserSummariesProps) {
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>(summaries);
  const [filteredSummaries, setFilteredSummaries] =
    useState<UserSummary[]>(userSummaries);
  const [sortby, setSortby] = useState<string>("Most recent");
  const [searchby, setSearchby] = useState<string>("");
  const debouncedSearch = useDebounce(searchby, 300);
  const { toast } = useToast();

  useEffect(() => {
    let newFilteredSummaries = userSummaries.filter((summary) =>
      summary.title.toLowerCase().includes(searchby.toLowerCase()),
    );

    if (sortby === "Most recent") {
      newFilteredSummaries = newFilteredSummaries.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      newFilteredSummaries = newFilteredSummaries.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    setFilteredSummaries(newFilteredSummaries);
  }, [debouncedSearch, sortby, userSummaries]);

  const memoizedFilteredSummaries = useMemo(
    () => filteredSummaries,
    [filteredSummaries],
  );

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/user/summaries/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the summary");
      }

      setUserSummaries((prevSummaries) =>
        prevSummaries.filter((summary) => summary.id !== id),
      );
      toast({
        title: "Summary deleted sucessfully!",
        description: `ID: ${id}`,
      });
    } catch (error) {
      console.error("Error deleting the summary:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 w-full mb-4 px-10 justify-between">
        <Input
          className="justify-self-start w-64"
          value={searchby}
          onChange={(e) => setSearchby(e.target.value)}
          placeholder="Search by article title:"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="justify-self-end w-40" variant="outline">
              Sort by: {sortby}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuRadioGroup
              value={sortby}
              onValueChange={(newSortby: string) => setSortby(newSortby)}
            >
              <DropdownMenuRadioItem value="Most recent">
                Most recent
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="Oldest">
                Oldest
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="h-96 w-11/12 rounded-md border p-6">
        {memoizedFilteredSummaries.map((summary) => (
          <Card
            key={summary.id}
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
                variant="destructive"
                onClick={() => handleDelete(summary.id)}
              >
                <Trash2Icon color="white" />{" "}
                <p className="text-white">Delete from history</p>
              </Button>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
}
