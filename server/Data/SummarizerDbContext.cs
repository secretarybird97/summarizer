using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class SummarizerDbContext(DbContextOptions<SummarizerDbContext> options) : DbContext(options)
{
    public DbSet<ArticleSummary> ArticleSummaries { get; set; }
    public DbSet<TextSummary> TextSummaries { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure one-to-many relationship between User and ArticleSummary
        modelBuilder.Entity<User>()
            .HasMany(u => u.ArticleSummaries)
            .WithOne(a => a.User)
            .HasForeignKey(a => a.UserId);

        // Configure one-to-many relationship between User and TextSummary
        modelBuilder.Entity<User>()
            .HasMany(u => u.TextSummaries)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId);
    }
}
