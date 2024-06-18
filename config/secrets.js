import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  db_url: process.env.MONGO_URL,
  jwt_secret_phrase: process.env.JWT_SECRET_PHRASE,

  email_service: process.env.SERVICE,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
  email_host: process.env.HOST,
  email_port: process.env.EMAIL_PORT,
};
