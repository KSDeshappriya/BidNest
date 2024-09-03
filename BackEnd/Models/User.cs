namespace BidNest.Models;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } // "Seller" or "Buyer"
    public ICollection<Item> Items { get; set; }
    public ICollection<Bid> Bids { get; set; }
}