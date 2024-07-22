using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

[Table("text_summary")]
public class TextSummary
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("title")]
    [MaxLength(30)]
    public string? Title { get; set; }

    [Column("input_text")]
    [Required]
    public string InputText { get; set; } = null!;

    [Column("summary")]
    [Required]
    public string Summary { get; set; } = null!;

    [Column("created_at")]
    [Required]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Column("user_id")]
    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
}
