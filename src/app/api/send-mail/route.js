import nodemailer from 'nodemailer';

export async function POST(req) {
  const { to, customerName } = await req.json(); 

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [to, process.env.ADMIN_EMAIL],
    subject: '📦 Your Order Has Been Placed Successfully!',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
          <h2 style="color: #2d2d2d;">Hello ${customerName},</h2>
          <p style="color: #333;">Thank you for your order! We're excited to process it shortly.</p>
          <p style="color: #333;">Here are the details of your order:</p>
          <ul>
            <li>Order Number: <strong>#${Math.floor(Math.random() * 10000)}</strong></li> 
            <li>Status: <strong>Processing</strong></li>
          </ul>
          <p style="color: #333;">We will send you an update once your order is on its way!</p>
          <br>
          <p style="color: #333;">If you have any questions, feel free to reach out to us.</p>
          <p style="color: #333;">Thank you for shopping with us!</p>
          <p style="color: #555; font-size: 0.9em;">Best regards,<br><strong>Your Company Name</strong></p>
          <footer style="color: #aaa; font-size: 0.8em;">
            <p>If you didn't place this order, please contact us immediately at <a href="mailto:support@yourcompany.com" style="color: #1a73e8;">support@yourcompany.com</a></p>
          </footer>
        </body>
      </html>
    `,
    text: `
      Hello ${customerName},

      Thank you for your order! We're excited to process it shortly.

      Order Number: #${Math.floor(Math.random() * 10000)}
      Status: Processing

      We will send you an update once your order is on its way!

      Best regards,
      Your Company Name

      If you didn't place this order, please contact us immediately at support@yourcompany.com
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
    // console.log("EMAIL_USER:", process.env.EMAIL_USER);  used for checking 
    // console.log("EMAIL_PASS:", process.env.EMAIL_PASS);  used for checking
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Email sending error:", error.message);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
