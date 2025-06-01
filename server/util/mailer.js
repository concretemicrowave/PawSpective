const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sendVerificationEmail(to, token) {
  const verifyUrl = `https://your-app.com/verify?token=${token}`;
  const mailOptions = {
    from: `"PawSpective" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your Email",
    html: `<p>Click the link below to verify your email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
  };

  return transporter.sendMail(mailOptions);
}

// NOT COMPLETE DO NOT PLAN TO COMPLETE SOON

module.exports = { sendVerificationEmail };
