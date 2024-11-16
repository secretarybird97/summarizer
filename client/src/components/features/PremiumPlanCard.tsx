"use client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PremiumPlanCard() {
  return (
    <Card className="bg-cardsBG w-8/12 h-64 border-NavText">
      <CardHeader>
        <CardTitle className="text-NavText font-bold">Premium Plan</CardTitle>
        <CardDescription className="text-white">
          Premium plan with access to unlimited features.
        </CardDescription>
        <CardDescription className="text-white font-bold">
          $6.99 / Month{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-white">
        <ul className="list-disc list-inside">
          <li>Unlimited summaries.</li>
          <li>Unlimited storage of summaries.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
