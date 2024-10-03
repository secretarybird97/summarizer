using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class SummarizerDbContext(DbContextOptions<SummarizerDbContext> options) : IdentityDbContext<User>(options)
{
    public DbSet<Summary> Summaries { get; set; }
    public DbSet<UserSummary> UserSummaries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Define the relationship between User and UserSummary
        modelBuilder.Entity<UserSummary>()
            .HasOne(us => us.User)
            .WithMany(u => u.UserSummaries)
            .HasForeignKey(us => us.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Define the relationship between Summary and UserSummary
        modelBuilder.Entity<UserSummary>()
            .HasOne(us => us.Summary)
            .WithMany()
            .HasForeignKey(us => us.SummaryId)
            .OnDelete(DeleteBehavior.Cascade);

        // (Optional) Composite unique constraint to prevent duplicate user-summary entries
        modelBuilder.Entity<UserSummary>()
            .HasIndex(us => new { us.UserId, us.SummaryId })
            .IsUnique();
    }
}
