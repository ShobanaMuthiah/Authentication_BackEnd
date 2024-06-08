import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service:"gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: true,
  auth: {
    user: process.env.SECRET_MAIL,
    pass: process.env.SECRET_KEY,
  },
});
export const forgot=async(email,token)=>{
  const receiver={
    from:process.env.SECRET_MAIL,
    to:email,
    subject:"password reset request",
    text:`click on this link to generate your new pasword ${process.env.CLIENT_URL}/reset-password/${token}` 
  }
  await transporter.sendMail(receiver)
 
}

