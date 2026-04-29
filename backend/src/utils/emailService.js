import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, code) => {
  // For testing: Always log the code to console FIRST
  console.log(`🔑 VERIFICATION CODE for ${email}: ${code}`);
  console.log(`⏰ Code expires in 10 minutes`);
  console.log(`📧 Check your email inbox (and spam folder) for: ${email}`);

  // Check if email credentials are available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("⚠️  Email credentials not configured. Using console-only mode.");
    return;
  }

  const mailOptions = {
    from: `"Coinbase Clone" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Coinbase Account",
    text: `Your verification code is: ${code}. It expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0052FF;">Verify Your Coinbase Account</h2>
        <p>Hello!</p>
        <p>Your verification code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #0052FF;">${code}</span>
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">This is an automated message from Coinbase Clone.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.log("📧 EMAIL FAILED - Use the console code above to complete verification");
    // Don't throw error - let the user use the console code
  }
};