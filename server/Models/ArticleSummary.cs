using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

[Table("article_summary")]
public class ArticleSummary
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("title")]
    [MaxLength(30)]
    public string? Title { get; set; }

    [Column("url")]
    [Required]
    public string Url { get; set; } = null!;

    [Column("summary")]
    [Required]
    public string Summary { get; set; } = null!;

    [Column("created_at")]
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("user_id")]
    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
}
