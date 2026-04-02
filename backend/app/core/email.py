from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.config import settings
from app.models.content import ContactSubmission

async def send_contact_notification(submission: ContactSubmission):
    if not settings.SENDGRID_API_KEY:
        return
    
    # Message content
    message_text = f"""
    New contact submission from {submission.name} ({submission.email}).
    
    Phone: {submission.phone or 'N/A'}
    Subject: {submission.subject or 'General Inquiry'}
    
    Message:
    {submission.message}
    
    ---
    This email was sent automatically from Rewaj Corporate Limited portal.
    """
    
    message = Mail(
        from_email=settings.FROM_EMAIL,
        to_emails=settings.ADMIN_EMAIL,
        subject=f"New Contact: {submission.subject or 'General Inquiry'}",
        plain_text_content=message_text
    )
    
    try:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        # Using a background thread or a more robust async strategy is better for production, 
        # but for this audit activation, we'll keep it simple.
        sg.send(message)
    except Exception as e:
        print(f"Error sending email: {e}")
