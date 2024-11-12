"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserInfo } from "@/types/user_info";

export default function ManagePlan({ userInfo }: { userInfo: UserInfo }) {
  const isPremium = userInfo.subscriptionTier === 1;

  return (
    <Card className="bg-cardsBG w-5/12 h-min border-NavText">
      <CardHeader>
        <CardTitle className="text-NavText font-bold">
          {isPremium ? "Premium Plan" : "Basic Plan"}
        </CardTitle>
        <CardDescription className="text-white">
          {isPremium
            ? "You currently have the Premium Plan"
            : "You currently have the Basic Plan"}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-white">
        <ul className="list-disc list-inside">
          {isPremium ? (
            <>
              <li>Unlimited summaries per day.</li>
              <li>Unlimited storage for your summaries.</li>
            </>
          ) : (
            <>
              <li>3 summaries per day.</li>
              <li>10 summaries limit in storage of summaries.</li>
            </>
          )}
        </ul>
        <br />
        <br />
        <Button className="w-full h-full align-bottom rounded-none font-bold leading-loose bg-intButton hover:bg-rose-500">
          <a href="/about">Change Plan</a>
        </Button>
      </CardContent>
    </Card>
  );
}
