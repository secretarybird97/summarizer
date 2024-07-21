using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("ArticleSummary")]
    public class ArticleSummary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string Title { get; set; }

        [Required]
        public string Url { get; set; }

        [Required]
        public string Result { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public User User { get; set; }

    }
};

