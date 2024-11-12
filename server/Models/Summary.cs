using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Summary
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Title { get; set; } = string.Empty;

    [Required]
    public string Input { get; set; } = string.Empty;

    [Required]
    public string Output { get; set; } = string.Empty;

    [Required]
    public SummaryType Type { get; set; }

    [Url]
    public string? Url { get; set; }
}
