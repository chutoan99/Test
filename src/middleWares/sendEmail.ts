import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

const sendEmail = async (email: any, html: any) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL
    }
  })
  const mainOptions: any = {
    from: process.env.USER_EMAIL,
    to: `${email}`,
    subject: 'Update password', // tieu de,
    text: 'You recieved message from ' + email,
    html: html
  }
  const info = await transporter.sendMail(mainOptions)
  return info
}
export default sendEmail
