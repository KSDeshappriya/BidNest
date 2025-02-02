namespace BidNest.Models;

public class Payment
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentTime { get; set; }
    public User Payer { get; set; }
    public int PayerId { get; set; }
    public int ItemId { get; set; }
    public string StripePaymentIntentId { get; set; }
    public int BidId { get; set; }
}
