namespace BidNest.Models;

public class PaymentIntentCreateRequest
{
    public int ItemId { get; set; }
    public string BidId { get; set; }
    public string UserId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "usd";
}

public class PaymentIntentResponse
{
    public string ClientSecret { get; set; }
    public string PaymentIntentId { get; set; }
}