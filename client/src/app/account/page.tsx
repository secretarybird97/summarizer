import ProtectedRoute from "@/components/common/protectedRoute";
import ManagePlan from "@/components/features/managePlan";
import UserSummaries from "@/components/features/userSummaries";
import { fetchAccountDetails, fetchSummaries } from "@/lib/api";
import { AccountDetails } from "@/types/account-details";
import { UserSummary } from "@/types/user-summary";
import { NextResponse } from "next/server";

export default async function Page() {
  const response = await fetchSummaries();
  if (response.status === 401) {
    return NextResponse.redirect("/login");
  }

  const summaries: UserSummary[] = await response.json();

  const responseDetails = await fetchAccountDetails();

  if (responseDetails.status === 401) {
    return NextResponse.redirect("/login");
  }

  const userInfo: AccountDetails = await responseDetails.json();

  return (
    <ProtectedRoute>
      <div className="flex flex-col">
        <div className="grid grid-cols-2 items-center justify-items-center pb-20 font-[family-name:var(--font-geist-sans)]">
          <div className="justify-items-center w-full">
            <h1 className="font-bold text-4xl text-NavText mb-10">
              Account History
            </h1>
            <UserSummaries summaries={summaries} />
          </div>
          <ManagePlan userInfo={userInfo} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
