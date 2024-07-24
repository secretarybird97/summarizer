using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class TextSummary
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    [MaxLength(30)]
    public string? Title { get; set; }

    [Required]
    public string InputText { get; set; } = null!;

    [Required]
    public string Summary { get; set; } = null!;

    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Required]
    public string UserId { get; set; } = null!;

    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
}
