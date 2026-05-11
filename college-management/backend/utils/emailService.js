const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOTPEmail = async (toEmail, otp, userName = 'User') => {
  try {
    await resend.emails.send({
  from: 'LKCWSC <onboarding@resend.dev>',
  to: toEmail,
  subject: 'Your Login OTP - LKCWSC',
  html: `...`
});

console.log('OTP email sent successfully');
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hello ${userName}</h2>

          <p>Your OTP for login is:</p>

          <h1 style="letter-spacing: 6px; color: #1565C0;">
            ${otp}
          </h1>

          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `
    });

    return { success: true };

  } catch (error) {
    console.log('Resend Error:', error);

    return {
      success: false,
      error: error.message
    };
  }
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
