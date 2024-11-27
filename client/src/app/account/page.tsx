import ManagePlan from "@/components/features/managePlan";
import UserSummaries from "@/components/features/userSummaries";
import {
  fetchAccountDetails,
  fetchSummaries,
  isAuthenticated,
} from "@/lib/api";
import { AccountDetails } from "@/types/account-details";
import { UserSummary } from "@/types/user-summary";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = await isAuthenticated();
  if (!auth) {
    redirect("/login");
  }

  const response = await fetchSummaries();
  if (response.status === 401) {
    redirect("/login");
  }

  const summaries: UserSummary[] = await response.json();

  const responseDetails = await fetchAccountDetails();

  if (responseDetails.status === 401) {
    redirect("/login");
  }

  const userInfo: AccountDetails = await responseDetails.json();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center pb-20 font-[family-name:var(--font-geist-sans)]">
        <section className="mb-8">
          <div className="justify-items-center w-full">
            <h1 className="font-bold text-4xl mb-2">Account History</h1>
            <h2 className="mb-10 font-mono text-muted-foreground text-sm">
              user: {userInfo.username}
            </h2>
            <UserSummaries summaries={summaries} />
          </div>
        </section>
        <section>
          <ManagePlan userInfo={userInfo} />
        </section>
      </div>
    </div>
  );
}
