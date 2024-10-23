namespace BidNest.Models;

public class PaymentIntentCreateRequest
{
    public int ItemId { get; set; }
    public int BidId { get; set; }
    public long Amount { get; set; }
    public string Currency { get; set; } = "usd";
}

public class PaymentIntentResponse
{
    public string ClientSecret { get; set; }
    public string PaymentIntentId { get; set; }
}