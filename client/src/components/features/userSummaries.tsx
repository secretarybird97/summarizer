"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/utils";
import { UserSummary } from "@/types/user_summary";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scrollarea";

interface UserSummariesProps {
  summaries: UserSummary[];
}

export default function UserSummaries({ summaries }: UserSummariesProps) {
  const [userSummaries, setUserSummaries] = useState<UserSummary[]>(summaries);
  const [sortby, setSortby] = useState<string>("Most recent");
  const [searchby, setSearchby] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Filter and sort summaries whenever `searchby`, `sortby`, or `summaries` change.
    let filteredSummaries = summaries.filter((summary) =>
      summary.title.toLowerCase().includes(searchby.toLowerCase()),
    );

    if (sortby === "Most recent") {
      filteredSummaries = filteredSummaries.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      filteredSummaries = filteredSummaries.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    setUserSummaries(filteredSummaries);
  }, [searchby, sortby, summaries]);

  const handleDelete = async (id: string) => {
    try {
      // const response = await fetch(`/api/user/summaries/${id}`, {
      //   method: "DELETE",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to delete the summary");
      // }
      let title = userSummaries.filter((summary) => summary.id == id)[0].title
      let desc=" "
      if (title=="") {
        desc = `${id}`
      }
      else {
        desc = `${title}`
      }
      setUserSummaries((prevSummaries) =>
        prevSummaries.filter((summary) => summary.id !== id),
      );
      toast({
        title: "Summary deleted sucessfully!",
        description: `Summary ${desc}`,
      });
    } catch (error) {
      console.error("Error deleting the summary:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 w-full mb-4 px-10 justify-between">
        <Input
          className="justify-self-start w-64 text-white border-NavText"
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
      {userSummaries.length==0 ?

        searchby=="" ?
          <h1 className="text-NavText text-4xl font-bold self-center justify-self-center">Nothing here yet</h1> 
          :
          <h1 className="text-NavText text-4xl font-bold self-center justify-self-center">No matches</h1> 
          
         :
        <>
        {userSummaries.map((summary) => (
          <Card
            key={summary.id}
            className="bg-cardsBG w-full h-min border-transparent my-5"
          >
            <CardHeader>
              <CardTitle className="text-NavText font-bold self-center">
                {summary.title!="" 
                ? summary.title
                : summary.id
                }
              </CardTitle>
              <CardDescription className="text-white self-end">
                Generated on {formatDate(summary.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <p className="text-justify">{summary.content}</p>
            </CardContent>
            <CardContent className="text-white">
              <p className="text-justify">{}</p>
            </CardContent>
            <CardContent className="justify-self-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2Icon color="white" />{" "}
                    <p className="text-white">Delete from history</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button onClick={() => handleDelete(summary.id)}>
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ))}</>
      }
      </ScrollArea>
    </>
  );
}
