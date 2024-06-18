import sendEmail from "../../utilities/sendEmail.js";
import secrets from "../../config/secrets.js";
import userModel from "../../models/User.js";

export const forgetPassword_get = async (req, res) => {
  res.render("registration/forgetPassword", { title: "Forget password" });
};

export const forgetPassword_post = async (req, res) => {
  const { email } = req.body;
  const { domain } = secrets;

  const founduser = await userModel.findOne({ email });

  if (!founduser)
    return res.status(409).json({ errMsg: "Email is not registered" });

  const emailBody = {
    to: email,
    subject: "Forget password",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Forgot Your Password?</h2>
        <p>No worries, it happens! Click the link below to reset your password:</p>
        <p><a href="http://${domain}:3000/changePassword/${founduser._id}">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>Your Website Team</p>
      </div>
    </body>
    </html>
  `,
  };

  const emailResponse = await sendEmail(emailBody);

  if (emailResponse.success) {
    res.send({
      msg: emailResponse.message,
    });
  } else {
    res.status(500).send({
      errMsg: emailResponse.message,
    });
  }
};
