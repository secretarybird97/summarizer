using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class ArticleSummaryRequest
{
    [Required]
    [Url]
    public string Url { get; set; } = string.Empty;
}
