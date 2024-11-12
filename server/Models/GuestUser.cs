using System.ComponentModel.DataAnnotations;


namespace server.Models;

public class GuestUser
{
    [Key]
    public string Identifier { get; set; } = Guid.NewGuid().ToString();

    public string IpAddress { get; set; } = "";

    public DateTime Date { get; set; } = DateTime.UtcNow;

    public int RequestCount { get; set; } = 0;
}
