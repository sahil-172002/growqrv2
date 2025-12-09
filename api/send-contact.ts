import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = 'GrowQR <noreply@growqr.ai>';
const TEAM_EMAIL = 'sahil172002@gmail.com'; // Your team's email to receive notifications

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
}

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message, type }: ContactFormData = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const inquiryType = type === 'sales' ? 'Sales Enquiry' : 'General Enquiry';
        const subjectLine = subject || 'General Inquiry';
        // Convert newlines to HTML breaks for proper email formatting
        const formattedMessage = message.replace(/\n/g, '<br>');

        // 1. Send notification email to team
        await resend.emails.send({
            from: FROM_EMAIL,
            to: TEAM_EMAIL,
            subject: `New Contact Form: ${subjectLine}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FF8F5C 100%); padding: 30px; border-radius: 16px 16px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                    </div>
                    
                    <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
                        <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 16px 0;"><strong style="color: #374151;">Inquiry Type:</strong> <span style="color: #6b7280;">${inquiryType}</span></p>
                            <p style="margin: 0 0 16px 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #6b7280;">${name}</span></p>
                            <p style="margin: 0 0 16px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #FF6B35;">${email}</a></p>
                            <p style="margin: 0 0 16px 0;"><strong style="color: #374151;">Subject:</strong> <span style="color: #6b7280;">${subjectLine}</span></p>
                            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                            <p style="margin: 0 0 8px 0;"><strong style="color: #374151;">Message:</strong></p>
                            <p style="color: #6b7280; margin: 0; line-height: 1.6;">${formattedMessage}</p>
                        </div>
                        
                        <div style="margin-top: 24px; text-align: center;">
                            <a href="mailto:${email}?subject=Re: ${subjectLine}" 
                               style="display: inline-block; background: #FF6B35; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                Reply to ${name}
                            </a>
                        </div>
                    </div>
                    
                    <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 24px;">
                        This email was sent from the GrowQR contact form.
                    </p>
                </div>
            `,
        });

        // 2. Send confirmation email to user
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: `We received your message - GrowQR`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <img src="https://growqr.ai/logo.webp" alt="GrowQR" style="height: 32px;">
                    </div>
                    
                    <div style="background: white; padding: 40px; border-radius: 16px; border: 1px solid #e5e7eb; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
                        <h1 style="color: #111827; margin: 0 0 16px 0; font-size: 28px;">Thanks for reaching out, ${name}! 👋</h1>
                        
                        <p style="color: #6b7280; font-size: 16px; line-height: 1.7; margin: 0 0 24px 0;">
                            We've received your message and our team will get back to you <strong style="color: #374151;">shortly</strong>.
                        </p>
                        
                        <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 24px;">
                            <p style="margin: 0 0 8px 0; color: #374151; font-weight: 600;">Your Message Summary:</p>
                            <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Subject:</strong> ${subjectLine}</p>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 16px; line-height: 1.7; margin: 0;">
                            In the meantime, feel free to explore more about how GrowQR is revolutionizing skill identity and verification.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 32px;">
                        <a href="https://growqr.ai" 
                           style="display: inline-block; background: linear-gradient(135deg, #FF6B35 0%, #FF8F5C 100%); color: white; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
                            Visit GrowQR
                        </a>
                    </div>
                    
                    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">
                            © 2025-2026 GrowQR. All rights reserved.
                        </p>
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            103 Carnegie Center Drive, Princeton, NJ 08540
                        </p>
                    </div>
                </div>
            `,
        });

        return res.status(200).json({ success: true, message: 'Emails sent successfully' });

    } catch (error: any) {
        console.error('Email sending error:', error);
        return res.status(500).json({
            error: 'Failed to send email',
            details: error.message
        });
    }
}
