using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    [Table("TextSummary")]
    public class TextSummary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public string Input { get; set; }

        [Required]
        public string Result { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public User User { get; set; }
    }
}
