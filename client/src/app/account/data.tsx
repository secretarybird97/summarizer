import { UserInfo } from "@/types/user_info";
import { UserSummary } from "@/types/user_summary";

const sampleSummaries: UserSummary[] = [
  {
    id: "671680bc-c55d-4b52-b6ce-a851f00d12a3",
    title: "CrowdStrike outage",
    content:
      "Experts warn of opportunistic hacking attempts linked to the CrowdStrike outage. Cyber agencies in the UK and Australia are warning people to be vigilant to fake emails, calls and websites that pretend to be official. CrowdStrike head George Kurtz encouraged users to make sure they were speaking to official representatives before downloading fixes.",
    createdAt: "2022-11-11T04:10:41.094481Z",
  },
  {
    id: "eb0e5337-929d-41f3-89dd-92097ae36a9d",
    title: "Trump calls Michelle Obama a “hater”",
    content:
      "At a rally in Atlanta, Donald Trump called the former first lady a “hater,” in response to her comments saying he had displayed “erratic behavior” and “obvious mental decline” “I always tried to be so nice and respectful,’ said Mr. Trump, who in 2011 spent weeks spreading the lie that Barack Obama was actually born in Kenya.",
    createdAt: "2023-11-11T04:12:30.291493Z",
  },
  {
    id: "b3e73546-e050-4fb2-83b6-6a53df5ce57a",
    title: "",
    content:
      'www.dailymail.co.uk/news/world-news/2013/01/27/kremlin-spokesman-spoke-out-against-Russian-troops.html#storylink=cpy. http://www.reuters.com/article/2013-01-27/remlin-speaks-out against- Russian-troopers.html"',
    createdAt: "2024-11-11T04:13:18.535101Z",
  },
];

const sampleUserInfo: UserInfo = {
  createdAt: "2024-11-11T06:57:59.579836Z",
  subscriptionTier: 0,
  dailyRequestCount: 0,
  lastRequestAt: "2024-11-12T04:47:02.232937Z",
  username: "email@example.com",
};

export { sampleSummaries, sampleUserInfo };
