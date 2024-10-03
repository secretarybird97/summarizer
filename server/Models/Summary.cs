using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Summary
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [MaxLength(30)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string InputText { get; set; } = string.Empty;

    [Required]
    public string Text { get; set; } = string.Empty;

    [Required]
    public SummaryType Type { get; set; }

    public string? Url { get; set; }
}

public enum SummaryType
{
    Text,
    Article
}
