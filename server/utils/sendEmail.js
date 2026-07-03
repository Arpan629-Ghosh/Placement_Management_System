import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async ({ to, subject, html }) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "PMS System",
      email: process.env.SENDER_EMAIL,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};
