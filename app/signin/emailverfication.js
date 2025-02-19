const nodemailer = require("nodemailer");

// Set up the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service like SendGrid
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Function to send custom email
export default sendCustomVerificationEmail = (email) => {
  const mailOptions = {
    from: 'Butudents19@gmail.com',
    to: email,
    subject: 'Please Verify Your Email Address',
    text: `Hello! We just wanted to let you know that we received a request to verify your email address for our app. 
    
    Please click the link below to verify your email:
    <verification link here>

    If you didn’t request this, just ignore this email.

    Thanks,
    The Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
