using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BidNest.Services
{
    public class NotificationService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;

        public NotificationService(string smtpHost, int smtpPort, string smtpUsername, string smtpPassword)
        {
            _smtpHost = smtpHost;
            _smtpPort = smtpPort;
            _smtpUsername = smtpUsername;
            _smtpPassword = smtpPassword;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            using (var client = new SmtpClient(_smtpHost, _smtpPort)
            {
                Credentials = new NetworkCredential(_smtpUsername, _smtpPassword),
                EnableSsl = true // Enable SSL if required by your SMTP server
            })
            {
                using (var message = new MailMessage("your_email@example.com", toEmail)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    await client.SendMailAsync(message);
                }
            }
        }
    }
}