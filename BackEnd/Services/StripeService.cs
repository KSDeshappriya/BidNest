using BidNest.Models;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace BidNest.Services;

public interface IStripeService
{
    Task<PaymentIntentResponse> CreatePaymentIntent(PaymentIntentCreateRequest request);
    Task<bool> ConfirmPayment(string paymentIntentId);
}

public class StripeService : IStripeService
{
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public StripeService(IConfiguration configuration, ApplicationDbContext context)
    {
        _configuration = configuration;
        _context = context;
        StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
    }

    public async Task<PaymentIntentResponse> CreatePaymentIntent(PaymentIntentCreateRequest request)
    {
        var bid = await _context.Bids
            .Include(b => b.Item)
            .FirstOrDefaultAsync(b => b.Id == request.BidId);

        if (bid == null)
            throw new Exception("Bid not found");

        var options = new PaymentIntentCreateOptions
        {
            Amount = Convert.ToInt64(bid.Amount * 100), // Stripe uses cents
            Currency = request.Currency,
            Metadata = new Dictionary<string, string>
            {
                { "ItemId", bid.ItemId.ToString() },
                { "BidId", bid.Id.ToString() }
            }
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return new PaymentIntentResponse
        {
            ClientSecret = paymentIntent.ClientSecret,
            PaymentIntentId = paymentIntent.Id
        };
    }

    public async Task<bool> ConfirmPayment(string paymentIntentId)
    {
        var service = new PaymentIntentService();
        var paymentIntent = await service.GetAsync(paymentIntentId);

        if (paymentIntent.Status == "succeeded")
        {
            // Create payment record
            var payment = new Payment
            {
                Amount = paymentIntent.Amount / 100m,
                PaymentTime = DateTime.UtcNow,
                PayerId = int.Parse(paymentIntent.Metadata["BidId"]),
                ItemId = int.Parse(paymentIntent.Metadata["ItemId"])
            };

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();

            return true;
        }

        return false;
    }
}