const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOTPEmail = async (toEmail, otp, userName = 'User') => {
  const mailOptions = {
    from: `"LKCWSC College" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔐 Your Login OTP - LKCWSC',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-radius: 10px;">
        
        <div style="background: #8B1A1A; color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0;">🎓 LKCWSC</h1>
          <p style="margin: 5px 0 0 0;">
            Late Kalpana Chawla Women's Senior College
          </p>
        </div>

        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">

          <h2 style="color: #333;">Hello ${userName},</h2>

          <p style="color: #555; font-size: 15px;">
            Your One-Time Password (OTP) for login verification is:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: #fef3c7; border: 2px dashed #f59e0b; padding: 20px 40px; border-radius: 10px;">
              
              <h1 style="color: #8B1A1A; margin: 0; letter-spacing: 8px; font-size: 36px;">
                ${otp}
              </h1>

            </div>
          </div>

          <p style="color: #555; font-size: 14px;">
            ⏰ This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p style="color: #d97706; font-size: 13px; background: #fef3c7; padding: 12px; border-radius: 6px;">
            ⚠️ <strong>Security Notice:</strong>
            Do not share this OTP with anyone.
          </p>

        </div>
      </div>
    `
  };

  try {

    await transporter.sendMail(mailOptions);

    console.log('✅ Email sent to:', toEmail);

    return {
      success: true
    };

  } catch (error) {

    console.error('Email send error:', error.message);

    return {
      success: false,
      error: error.message
    };
  }
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
