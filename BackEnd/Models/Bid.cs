namespace BidNest.Models;

public class Bid
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime BidTime { get; set; }
    public User Bidder { get; set; }
    public int BidderId { get; set; }
    public Item Item { get; set; }
    public int ItemId { get; set; }
    public bool IsHighest { get; set; }
}
