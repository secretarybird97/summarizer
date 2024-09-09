using Microsoft.AspNetCore.Identity;

namespace server.Models;

public class User : IdentityUser
{
    public ICollection<ArticleSummary> ArticleSummaries { get; set; } = [];

    public ICollection<TextSummary> TextSummaries { get; set; } = [];
}
