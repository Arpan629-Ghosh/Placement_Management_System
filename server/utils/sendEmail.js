import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  // Connection pooling
  pool: true,
  maxConnections: 5,
  maxMessages: 100,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify once when server starts
transporter.verify((err) => {
  if (err) {
    console.error("SMTP Connection Error:", err);
  } else {
    console.log("✅ SMTP Connected");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"PMS System" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};
