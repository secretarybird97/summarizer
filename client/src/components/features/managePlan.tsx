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
import { AccountDetails } from "@/types/account-details";

export default function ManagePlan({ userInfo }: { userInfo: AccountDetails }) {
  const isPremium = userInfo.subscriptionTier === 1;

  return (
    <Card className="bg-cardsBG w-5/12 h-min border-secondary">
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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
