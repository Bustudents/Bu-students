// pages/api/sendEmail.js
import { NextResponse } from 'next/server';
import { sendEmailNotification } from "../../utils/sendeamil"; // Import your sendEmailNotification function

export async function POST(req) {
  try {
    const { email } = await req.json();  // Parse the incoming JSON body
    await sendEmailNotification(email);  // Call the function to send the email
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
