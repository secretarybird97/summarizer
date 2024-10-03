using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services;

public class UserAccessService(SummarizerDbContext dbContext)
{
    private readonly SummarizerDbContext _dbContext = dbContext;

    public async Task<bool> CanSummarizeAsync([NotNull] User user)
    {
        if (user.SubscriptionTier == SubscriptionTier.Premium)
        {
            return true;
        }

        if (user.DailyRequestCount >= 5 && user.LastRequestAt.Date == DateTime.UtcNow.Date)
        {
            return false; // Reached daily limit
        }

        // Check if they have more than 10 summaries in history
        var summaryCount = await _dbContext.UserSummaries
            .CountAsync(us => us.UserId == user.Id);

        if (summaryCount >= 10)
        {
            return false; // Exceeded history limit
        }

        // await _dbContext.SaveChangesAsync();

        return true;
    }
}
