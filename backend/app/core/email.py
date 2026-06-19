import aiosmtplib
from email.message import EmailMessage
import httpx
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.core.config import settings
from app.models.content import ContactSubmission, NewsletterSubscription
from app.models.job import JobApplication

async def send_email_async(to_email: str, subject: str, content: str):
    """Unified helper to send email via SMTP (priority), Brevo, or SendGrid."""
    # Try SMTP first if configured
    if settings.SMTP_USER and settings.SMTP_PASSWORD:
        message = EmailMessage()
        message["From"] = settings.FROM_EMAIL
        message["To"] = to_email
        message["Subject"] = subject
        message.set_content(content)
        
        try:
            await aiosmtplib.send(
                message,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASSWORD,
                start_tls=settings.SMTP_TLS,
            )
            return True, None
        except Exception as e:
            return False, f"SMTP Error: {str(e)}"

    # Use Brevo if configured
    if settings.BREVO_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                response = await client.post(
                    "https://api.brevo.com/v3/smtp/email",
                    headers={
                        "api-key": settings.BREVO_API_KEY,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    json={
                        "sender": {
                            "email": settings.FROM_EMAIL,
                            "name": "Rewaj Corporate Limited"
                        },
                        "to": [{"email": to_email}],
                        "subject": subject,
                        "textContent": content,
                        "htmlContent": content.replace("\n", "<br />"),
                    },
                )
            if 200 <= response.status_code < 300:
                return True, None
            return False, f"Brevo Error: {response.status_code} {response.text}"
        except Exception as e:
            return False, f"Brevo Error: {str(e)}"

    # Fallback to SendGrid if API Key is present
    if settings.SENDGRID_API_KEY:
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        message = Mail(
            from_email=settings.FROM_EMAIL,
            to_emails=to_email,
            subject=subject,
            plain_text_content=content
        )
        try:
            response = sg.send(message)
            if 200 <= response.status_code < 300:
                return True, None
            return False, f"SendGrid Error: {response.status_code}"
        except Exception as e:
            return False, f"SendGrid Error: {str(e)}"

    return False, "No email provider configured"

async def send_contact_notification(submission: ContactSubmission):
    message_text = f"""
    New contact submission from {submission.name} ({submission.email}).
    
    Company: {submission.company or 'N/A'}
    Phone: {submission.phone or 'N/A'}
    Subject: {submission.subject or 'General Inquiry'}
    
    Message:
    {submission.message}
    
    ---
    This email was sent automatically from Rewaj Corporate Limited portal.
    """
    to_email = settings.ADMIN_EMAIL or settings.ADMIN_EMAIL_DEFAULT
    success, error = await send_email_async(
        to_email=to_email,
        subject=f"New Contact: {submission.subject or 'General Inquiry'}",
        content=message_text
    )
    if success:
        print(f"✓ Contact email sent to {to_email}")
    else:
        print(f"✗ Contact email FAILED to {to_email}: {error}")

async def send_newsletter_notification(subscription: NewsletterSubscription):
    admin_content = (
        f"A visitor subscribed to the newsletter with the email: {subscription.email}.\n"
        f"Subscription date: {subscription.created_at}" if subscription.created_at else
        f"A visitor subscribed to the newsletter with the email: {subscription.email}."
    )
    
    confirmation_content = (
        "Thank you for subscribing to Rewaj Corporate Limited's Industry Insights.\n\n"
        "You will receive the latest industry insights, expert analysis, and updates on the Nigerian energy sector directly to your inbox.\n\n"
        "If you did not request this subscription, please ignore this email."
    )

    success1, error1 = await send_email_async(settings.ADMIN_EMAIL, "New Newsletter Subscriber", admin_content)
    if success1:
        print(f"✓ Newsletter admin notification sent to {settings.ADMIN_EMAIL}")
    else:
        print(f"✗ Newsletter admin notification FAILED to {settings.ADMIN_EMAIL}: {error1}")
    
    success2, error2 = await send_email_async(subscription.email, "You're subscribed to Industry Insights", confirmation_content)
    if success2:
        print(f"✓ Newsletter confirmation sent to {subscription.email}")
    else:
        print(f"✗ Newsletter confirmation FAILED to {subscription.email}: {error2}")

async def send_bulk_newsletter(subscribers, subject: str, content: str):
    success_count = 0
    errors = []
    
    for subscriber in subscribers:
        success, error = await send_email_async(subscriber.email, subject, content)
        if success:
            success_count += 1
        else:
            errors.append(error)
            
    return success_count, errors

async def send_career_notification(application: JobApplication, job_title: str):
    message_text = f"""
    New Job Application Received:

    Name: {application.full_name}
    Email: {application.email}
    Phone: {application.phone or 'N/A'}
    Date of Birth: {application.dob}
    Gender: {application.gender}
    Nationality: {application.nationality}
    Highest Qualification: {application.highest_qualification}
    Institution: {application.institution}
    Course of Study: {application.course_of_study}
    NYSC Status: {application.nysc_status}
    Job Applied For: {job_title}
    CV Link: {application.cv_path or 'N/A'}
    Certifications Link: {application.certifications_path or 'N/A'}

    Please log in to the admin dashboard to review the application details.
    https://rewajcorporate.com/admin/careers/applications

    ---
    This email was sent automatically from Rewaj Corporate Limited portal.
    """

    recipients = [settings.CAREER_EMAIL, settings.ADMIN_EMAIL]
    delivery_errors = []

    for recipient in recipients:
        if not recipient:
            continue

        success, error = await send_email_async(
            to_email=recipient,
            subject=f"New Application: {job_title} - {application.full_name}",
            content=message_text
        )

        if success:
            print(f"✓ Career application email sent to {recipient}")
        else:
            print(f"✗ Career application email FAILED to {recipient}: {error}")
            delivery_errors.append(f"{recipient}: {error}")

    if delivery_errors:
        raise RuntimeError("; ".join(delivery_errors))
