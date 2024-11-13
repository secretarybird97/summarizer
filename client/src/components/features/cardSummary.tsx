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
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function CardSummary({
  summary,
  callbackfn,
}: {
  summary: UserSummary;
  callbackfn: (id: string) => void;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callbackfn(id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card key={summary.id} className="w-full h-min border-transparent my-5">
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
          className="rounded-none bg-gray-900 hover:bg-rose-500 h-10"
          onClick={() => handleDelete(summary.id)}
        >
          <>
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <Trash2Icon color="white" />
                <p className="text-white">Delete from history</p>
              </>
            )}
          </>
        </Button>
      </CardContent>
    </Card>
  );
}
