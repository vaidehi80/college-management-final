const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendOTPEmail = async (toEmail, otp, userName = 'User') => {
  try {
    const data = await resend.emails.send({
      from: 'LKCWSC College <noreply@vnssorg.com>',
      to: toEmail,
      subject: 'LKCWSC Verification Code',
      text: `Hello ${userName},\n\nYour verification code is: ${otp}\n\nThis code is valid for 5 minutes.\n\nIf you did not request this, please ignore this email.\n\nThank you,\nLKCWSC College\nGangaghat`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
          <div style="background: #8B1A1A; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">LKCWSC College</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Late Kalpana Chawla Women's Senior College, Gangaghat</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
            <h2 style="color: #333; margin-top: 0;">Hello ${userName},</h2>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">Your verification code for college portal login:</p>
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background: #ffffff; border: 2px solid #8B1A1A; padding: 20px 40px; border-radius: 8px;">
                <h1 style="color: #8B1A1A; margin: 0; letter-spacing: 6px; font-size: 32px; font-family: monospace;">${otp}</h1>
              </div>
            </div>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">This code is valid for <strong>5 minutes</strong>.</p>
            <p style="color: #555; font-size: 14px; line-height: 1.6;">If you did not request this code, please ignore this email or contact the administrator.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; line-height: 1.6; margin-bottom: 0;">
              Thank you,<br>
              <strong>LKCWSC College</strong><br>
              Gangaghat
            </p>
          </div>
        </div>
      `
    });

    console.log('Email sent to:', toEmail, '— ID:', data.id);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error.message || error);
    return { success: false, error: error.message };
  }
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
