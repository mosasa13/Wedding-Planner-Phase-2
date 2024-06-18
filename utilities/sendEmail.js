import nodemailer from 'nodemailer';
import secrets from '../config/secrets.js';

const sendEmail = async (body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: secrets.email_host,
      service: secrets.email_service,
      port: secrets.email_port,
      secure: true,
      auth: {
        user: secrets.email_user,
        pass: secrets.email_pass,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail(body);
    return {
      success: true,
      message: 'Email sent successfully!',
      info: info.response,
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to send email: ${error.message}`,
    };
  }
};

export default sendEmail;
