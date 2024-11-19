"use client";
import { changeSubscription } from "@/app/actions";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { AccountDetails } from "@/types/account-details";
import { SubscriptionTier } from "@/types/subscription-tier";
import { useState } from "react";

export default function ManagePlan({ userInfo }: { userInfo: AccountDetails }) {
  const [isPremium, setIsPremium] = useState<boolean>(
    userInfo.subscriptionTier === SubscriptionTier.Premium,
  );

  const handleSubscriptionChange = async () => {
    try {
      await changeSubscription(userInfo.subscriptionTier);
      setIsPremium(!isPremium);
      toast({
        title: "Plan changed successfully!",
        description: isPremium
          ? "Basic plan activated"
          : "Premium plan activated",
      });
    } catch {
      toast({
        title: "Failed to change plan",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-[#120c12] h-auto w-auto border-secondary">
      <CardHeader>
        <CardTitle className="text-NavText font-bold">
          {isPremium ? "Premium Plan" : "Basic Plan"}
        </CardTitle>
        <CardDescription className="font-mono">
          {isPremium
            ? "$6.99 USD / Month - For power users"
            : "Free - For casual users"}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-white">
        <ul className="list-disc list-inside">
          {isPremium ? (
            <>
              <li>Unlimited summaries</li>
              <li>
                Access to advanced AI models
                <Badge variant="secondary" className="ml-2">
                  Coming Soon
                </Badge>
              </li>
              <li>
                API access for integration
                <Badge variant="secondary" className="ml-2">
                  Coming Soon
                </Badge>
              </li>
              <li>
                Priority support
                <Badge variant="secondary" className="ml-2">
                  Coming Soon
                </Badge>
              </li>
            </>
          ) : (
            <>
              <li>5 summaries per day</li>
              <li>Access to basic summarization model</li>
              <li>Web-based interface</li>
            </>
          )}
        </ul>
        <br />
        <br />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full h-full align-bottom font-bold leading-loose bg-intButton hover:bg-rose-400">
              Change Plan
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently change the plan of your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleSubscriptionChange}>Continue</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
