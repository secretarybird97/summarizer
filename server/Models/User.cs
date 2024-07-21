using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public required string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Email { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(50)]
        public required string Password { get; set; }

        public ICollection<TextSummary> TextSummaries { get; set; }

        public ICollection<ArticleSummary> ArticleSummaries { get; set; }
    }

}
