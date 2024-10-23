using BidNest.Models;
using BidNest.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System.IO;
using System.Threading.Tasks;

namespace BidNest.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IStripeService _stripeService;
    private readonly IConfiguration _configuration; // Add this line
    private readonly IBidService _bidService; // Add this line

    public PaymentController(IStripeService stripeService, IConfiguration configuration, IBidService bidService) // Add configuration parameter
    {
        _stripeService = stripeService;
        _configuration = configuration; // Add this line
        _bidService = bidService; // Add this line
    }

    // POST: /api/payment/create-payment-intent
    [HttpPost("create-payment-intent")]
    public async Task<ActionResult<PaymentIntentResponse>> CreatePaymentIntent(
    PaymentIntentCreateRequest request)
    {
        try
        {
            // Validate that the amount matches the bid amount
            var bid = await _bidService.GetBidById(request.BidId);
            if (bid == null)
            {
                return NotFound(new { error = "Bid not found" });
            }

            if (bid.Amount != request.Amount)
            {
                return BadRequest(new { error = "Invalid payment amount" });
            }

            var response = await _stripeService.CreatePaymentIntent(request);
            return Ok(response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    // Add this method
    // This method will handle the Stripe webhook
    // It will confirm the payment if the payment_intent.succeeded event is received
    // It will return a 400 status code if the event is not valid
    // It will return a 200 status code if the event is valid
    // This method is called by Stripe when a payment is successful

    // POST: /api/payment/webhook
    [HttpPost("webhook")]
    public async Task<IActionResult> HandleStripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                Request.Headers["Stripe-Signature"],
                _configuration["Stripe:WebhookSecret"]
            );

            if (stripeEvent.Type == "payment_intent.succeeded")
            {
                var paymentIntent = stripeEvent.Data.Object as Stripe.PaymentIntent;
                if (paymentIntent != null)
                {
                    await _stripeService.ConfirmPayment(paymentIntent.Id);
                }
            }

            return Ok();
        }
        catch (StripeException e)
        {
            return BadRequest(new { error = e.Message });
        }
    }
}
