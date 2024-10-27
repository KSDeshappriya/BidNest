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
    public async Task<ActionResult<PaymentIntentResponse>> CreatePaymentIntent(PaymentIntentCreateRequest request)
    {
        try
        {
            // Validate that the amount matches the bid amount
            if (!int.TryParse(request.BidId, out int bidId))
            {
                return BadRequest(new { error = "Invalid BidId format" });
            }
            var bid = await _bidService.GetBidById(bidId);
            if (bid == null)
            {
                return NotFound(new { error = "Bid not found" });
            }

            if (bid.Amount != request.Amount)
            {
                return BadRequest(new { error = "Invalid payment amount" });
            }

            // Add metadata to associate the payment with a bid and user
            var metadata = new Dictionary<string, string>
            {
                { "BidId", request.BidId }
                // { "UserId", request.UserId }
            };

            // Pass metadata to the Stripe service
            var response = await _stripeService.CreatePaymentIntent(request, metadata);
        
            if (response == null)
            {
                return BadRequest(new { error = "Failed to create payment intent" });
            }
            
            return Ok(new { clientSecret = response.ClientSecret });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        // catch (StripeException stripeEx)
        // {
        //     return BadRequest(new { error = $"Stripe error: {stripeEx.StripeError.Message}" });
        // }
        // catch (Exception ex)
        // {
        //     return StatusCode(500, new { error = "An error occurred while creating the payment intent" });
        // }
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
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                if (paymentIntent != null)
                {
                    await _stripeService.ConfirmPayment(paymentIntent.Id);
                    Console.WriteLine($"Payment confirmed for PaymentIntent ID: {paymentIntent.Id}");
                }
            }
            else if (stripeEvent.Type == "payment_intent.payment_failed")
            {
                // Handle failed payment here, e.g., log the failure or update bid status
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                if (paymentIntent != null)
                {
                    Console.WriteLine($"Payment failed for PaymentIntent ID: {paymentIntent.Id}");
                }
            }

            return Ok();
        }
        catch (StripeException stripeEx)
        {
            // Handle Stripe-specific error
            return BadRequest(new { error = $"Stripe error: {stripeEx.Message}" });
        }
        catch (Exception ex)
        {
            // Handle any general exceptions
            return StatusCode(500, new { error = "Webhook processing failed." });
        }
    }

}
