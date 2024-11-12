using System.Diagnostics.CodeAnalysis;
using server.Data;
using server.Models;

namespace server.Services;

public class UserAccessService(SummarizerDbContext dbContext)
{
    private readonly SummarizerDbContext _dbContext = dbContext;

    public bool CanSummarize([NotNull] User user)
    {
        if (user.SubscriptionTier == SubscriptionTier.Premium)
        {
            return true;
        }

        if (user.LastRequestAt.Date != DateTime.UtcNow.Date)
        {
            user.DailyRequestCount = 0;
            user.LastRequestAt = DateTime.UtcNow;

            _dbContext.Users.Update(user);
        }

        if (user.DailyRequestCount >= 5 && user.LastRequestAt.Date == DateTime.UtcNow.Date)
        {
            return false;
        }

        return true;
    }

    public bool CanSummarize([NotNull] GuestUser guestSummary)
    {
        if (guestSummary.Date.Date != DateTime.UtcNow.Date)
        {
            guestSummary.RequestCount = 0;
            guestSummary.Date = DateTime.UtcNow;

            _dbContext.GuestSummaries.Update(guestSummary);
        }

        if (guestSummary.RequestCount >= 5 && guestSummary.Date.Date == DateTime.UtcNow.Date)
        {
            return false;
        }

        return true;
    }
}
