import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

interface EmailRequest {
  to: string;
  customerName: string;
  order: string;
}

export async function POST(req: Request) {
  const { to, customerName, order } = (await req.json()) as EmailRequest;

  // Validate all required fields
  if (!to || !customerName || !order) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Missing required fields',
        details: {
          missingTo: !to,
          missingName: !customerName,
          missingOrder: !order
        }
      },
      { status: 400 }
    );
  }

  // Validate environment variables
  if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS || !process.env.ZOHO_HOST) {
    console.error('❌ Missing Zoho email configuration');
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server configuration error',
        details: {
          missingUser: !process.env.ZOHO_USER,
          missingPass: !process.env.ZOHO_PASS,
          missingHost: !process.env.ZOHO_HOST
        }
      },
      { status: 500 }
    );
  }

  // Configure transporter with Zoho SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST, 
    port: Number(process.env.ZOHO_PORT),
    secure: true,
    auth: {
      user: process.env.ZOHO_USER, 
      pass: process.env.ZOHO_PASS, 
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  // Configure email options
  const mailOptions: nodemailer.SendMailOptions = {
    from: {
      name: 'Florest Hampers & Events',
      address: process.env.ZOHO_USER // Must match auth.user exactly
    },
    to: [to, process.env.ADMIN_EMAIL || ''].filter(Boolean),
    subject: '📦 Your Order Has Been Placed Successfully!',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <h2 style="color: #2d2d2d;">Hello ${customerName},</h2>
          <p style="color: #333;">Thank you for your order! We're excited to process it shortly.</p>
          <p style="color: #333;">Here are the details of your order:</p>
          <ul>
            <li>Order Id: <strong>${order}</strong></li> 
            <li>Status: <strong>Processing</strong></li>
          </ul>
          <p style="color: #333;">We will send you an update once your order is on its way!</p>
          <br>
          <p style="color: #333;">If you have any questions, feel free to reach out to us.</p>
          <p style="color: #333;">Thank you for shopping with us!</p>
          <p style="color: #555; font-size: 0.9em;">Best regards,<br><strong>Florest Hampers & Events</strong></p>
          <footer style="color: #aaa; font-size: 0.8em;">
            <p>If you didn't place this order, please contact us immediately at <a href="mailto:connect@floristnhampers.in" style="color: #1a73e8;">connect@floristnhampers.in</a></p>
          </footer>
        </body>
      </html>
    `,
    text: `
      Hello ${customerName},

      Thank you for your order! We're excited to process it shortly.

      Order Id: ${order}
      Status: Processing

      We will send you an update once your order is on its way!

      Best regards,
      Florest Hampers & Events

      If you didn't place this order, please contact us immediately at connect@floristnhampers.in
    `,
  };

  try {
    // Verify SMTP connection first
    await transporter.verify();
    console.log('✅ SMTP server is ready');

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully', info.messageId);
    
    return NextResponse.json({ 
      success: true,
      messageId: info.messageId
    }, { status: 200 });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Email sending failed:', error);

    // Enhanced error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: {
          message: errorMessage,
          solution: errorMessage.includes('553 Relaying disallowed') 
            ? 'Ensure your FROM address matches your Zoho account email exactly and your domain is verified in Zoho Mail'
            : 'Check your SMTP configuration and credentials'
        }
      }, 
      { status: 500 }
    );
  }
}