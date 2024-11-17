import { SubscriptionTier } from "./subscription-tier";

export type AccountDetails = {
  createdAt: string;
  subscriptionTier: SubscriptionTier;
  dailyRequestCount: number;
  lastRequestAt: string;
  username: string;
};
