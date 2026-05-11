const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOTPEmail = async (toEmail, otp, userName = 'User') => {
  try {
    await transporter.sendMail({
      from: `"LKCWSC College" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Your Login OTP - LKCWSC',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${userName}</h2>
          <p>Your OTP for login is:</p>
          <h1>${otp}</h1>
        </div>
      `
    });

    return { success: true };

  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: error.message
    };
  }
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
