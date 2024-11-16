"use client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function BasicPlanCard() {
  return (
    <Card className="bg-cardsBG w-8/12 h-64 border-NavText">
      <CardHeader>
        <CardTitle className="text-NavText font-bold">Basic Plan</CardTitle>
        <CardDescription className="text-white">
          Basic plan with basic functionalities.
        </CardDescription>
        <CardDescription className="text-white font-bold">
          Free{" "}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-white">
        <ul className="list-disc list-inside">
          <li>3 summaries per day.</li>
          <li>10 summaries limit in storage of summaries.</li>
        </ul>
      </CardContent>
    </Card>
  );
}
