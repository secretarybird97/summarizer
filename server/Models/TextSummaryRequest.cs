using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class TextSummaryRequest
{
    [Required]
    public string Text { get; set; } = string.Empty;
}