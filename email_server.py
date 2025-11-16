import smtplib
from email.message import EmailMessage
from flask import Flask, request, render_template, redirect, url_for


# --- This is the MailHog Configuration ---
SMTP_HOST = "localhost"
SMTP_PORT = 1025
# ------------------------------------------

def send_reset_email(recipient_email, reset_link):
    """
    Connects to MailHog and sends the reset email.
    """
    # 1. Create the Email Message
    msg = EmailMessage()
    msg.set_content(f"Click this link to reset your password: {reset_link}")
    msg['Subject'] = 'Your Password Reset Link'
    msg['From'] = 'no-reply@my-local-app.com'
    msg['To'] = recipient_email

    try:
        # 2. Connect to MailHog (the fake server)
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        
        server.send_message(msg)
        server.quit()
        
        print(f"Successfully sent reset email to MailHog for: {recipient_email}")
        return True

    except Exception as e:
        print(f"Error: Failed to send email via MailHog. {e}")
        return False
