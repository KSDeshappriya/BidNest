namespace BidNest.Models;

public class Item
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal StartingPrice { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAuctionLive { get; set; }
    public User Seller { get; set; }
    public int SellerId { get; set; }
    public string ImagePath { get; set; } // Add this line
    public ICollection<Bid> Bids { get; set; }
}