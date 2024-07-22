using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

[Table("user")]
public class User
{
    [Column("id")]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Column("username")]
    [Required]
    [MinLength(3)]
    [MaxLength(50)]
    public string Username { get; set; } = null!;

    [Column("password")]
    [Required]
    [MinLength(8)]
    [MaxLength(50)]
    public string Password { get; set; } = null!;

    public ICollection<ArticleSummary> ArticleSummaries { get; set; } = [];

    public ICollection<TextSummary> TextSummaries { get; set; } = [];
}
