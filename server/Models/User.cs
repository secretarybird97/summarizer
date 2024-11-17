using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace server.Models;

public class User : IdentityUser
{
    public ICollection<UserSummary> UserSummaries { get; set; } = [];

    public SubscriptionTier SubscriptionTier { get; set; } = SubscriptionTier.Free;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int DailyRequestCount { get; set; } = 0;

    public DateTime LastRequestAt { get; set; } = DateTime.UtcNow;
}
