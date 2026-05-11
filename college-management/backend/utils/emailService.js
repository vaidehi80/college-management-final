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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">

          <div style="background: #1565C0; color: white; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0;">LKCWSC College</h1>
          </div>

          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">

            <h2>Hello ${userName}</h2>

            <p>Your OTP for login is:</p>

            <div style="text-align: center; margin: 30px 0;">
              <h1 style="letter-spacing: 8px; color: #1565C0; font-size: 40px;">
                ${otp}
              </h1>
            </div>

            <p>This OTP is valid for 5 minutes.</p>

            <p style="color: red;">
              Do not share this OTP with anyone.
            </p>

          </div>
        </div>
      `
    });

    console.log('OTP email sent successfully');

    return {
      success: true
    };

  } catch (error) {

    console.log('Email Error:', error);

    return {
      success: false,
      error: error.message
    };
  }
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
