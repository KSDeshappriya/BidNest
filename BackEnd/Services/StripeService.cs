using BidNest.Models;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace BidNest.Services;

public interface IStripeService
{
    Task<PaymentIntentResponse> CreatePaymentIntent(PaymentIntentCreateRequest request, Dictionary<string, string> metadata);
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

    public async Task<PaymentIntentResponse> CreatePaymentIntent(PaymentIntentCreateRequest request, Dictionary<string, string> metadata)
    {
        // No need to fetch bid information here, as the amount is passed in the request
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(request.Amount * 100), // Convert decimal to long by multiplying by 100 and casting
            Currency = "usd", // Fixed currency to USD
            Metadata = metadata // Attach metadata here
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.CreateAsync(options);

        return new PaymentIntentResponse
        {
            ClientSecret = paymentIntent.ClientSecret
        };
    }

    public async Task<bool> ConfirmPayment(string paymentIntentId)
    {
        var service = new PaymentIntentService();
        var paymentIntent = await service.GetAsync(paymentIntentId);

        if (paymentIntent.Status == "succeeded")
        {
            // Ensure BidId exists in metadata before parsing
            if (paymentIntent.Metadata.ContainsKey("BidId"))
            {
                var payment = new Payment
                {
                    Amount = paymentIntent.Amount / 100m,
                    PaymentTime = DateTime.UtcNow,
                    PayerId = int.Parse(paymentIntent.Metadata["BidId"])
                    // ItemId = int.Parse(paymentIntent.Metadata["ItemId"])
                };

                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();

                return true;
            }
            else
            {
                // Handle the case where BidId is missing in metadata
                Console.WriteLine("BidId metadata is missing in payment intent.");
                return false;
            }
        }

        return false;
    }

}