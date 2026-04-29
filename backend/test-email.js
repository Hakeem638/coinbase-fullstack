import dotenv from "dotenv";
import { sendVerificationEmail } from "./src/utils/emailService.js";

dotenv.config();

// Test email functionality
async function testEmail() {
  try {
    console.log("🧪 Testing email service...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Not set");
    await sendVerificationEmail("test@example.com", "123456");
    console.log("✅ Email test completed");
  } catch (error) {
    console.error("❌ Email test failed:", error);
  }
}

testEmail();