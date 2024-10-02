import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config()

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    port: 465,
  secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });


