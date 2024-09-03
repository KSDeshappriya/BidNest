namespace BidNest.Models;

public class Feedback
{
    public int Id { get; set; }
    public string Comment { get; set; }
    public int Rating { get; set; } // 1-5
    public User User { get; set; }
    public int UserId { get; set; }
    public Item Item { get; set; }
    public int ItemId { get; set; }
}
