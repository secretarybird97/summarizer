"use client";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function Plan() {

  return (
    
    <Card className="bg-cardsBG w-5/12 h-min border-NavText">
    <CardHeader>
        <CardTitle className="text-NavText font-bold">Upgrade Plan</CardTitle>
        <CardDescription className="text-white">Upgrade your subscription plan and enjoy enhanced functions.</CardDescription>
        <CardDescription className="text-white font-bold">$x.xx / Month </CardDescription>

    </CardHeader>
    <CardContent className="text-white">
        <ul className="list-disc list-inside">
            <li>Unlimited summaries.</li>
            <li>Unlimited storage of summaries.</li>
        </ul>
        <br />
        <br />
        <Button className="w-full h-full align-bottom rounded-none font-bold leading-loose bg-intButton hover:bg-rose-500">
        Upgrade
        </Button>
    </CardContent>
    </Card>
  );
}
