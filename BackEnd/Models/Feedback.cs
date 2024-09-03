namespace BidNest.Models;

public class Feedback
{
    public int Id { get; set; }
    public int ItemId { get; set; }
    public int UserId { get; set; }
    public int Rating { get; set; } // Rating out of 5
    public string Comments { get; set; }
    public DateTime DateGiven { get; set; }

    public Item Item { get; set; }
    public User User { get; set; }
}