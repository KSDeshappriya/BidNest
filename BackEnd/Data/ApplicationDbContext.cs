using Microsoft.EntityFrameworkCore;
using BidNest.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // Define tables
    public DbSet<User> Users { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Bid> Bids { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }

    // Define relationships
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Items)
            .WithOne(i => i.Seller)
            .HasForeignKey(i => i.SellerId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Bids)
            .WithOne(b => b.Bidder)
            .HasForeignKey(b => b.BidderId);

        modelBuilder.Entity<Item>()
            .HasMany(i => i.Bids)
            .WithOne(b => b.Item)
            .HasForeignKey(b => b.ItemId);
    }
}
