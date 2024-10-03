using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class UserSummary
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [Required]
    public string UserId { get; set; } = null!;

    public User User { get; set; } = null!;

    [Required]
    public string SummaryId { get; set; } = null!;

    public Summary Summary { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
