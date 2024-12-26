
import nodemailer from "nodemailer";

export const sendEmailNotification = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",  // Use your email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "ahmedshbika90@gmail.com",
    to: email,
    subject: "Welcome to the Calendar",
    text: "You have signed in successfully to the calendar app.",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
