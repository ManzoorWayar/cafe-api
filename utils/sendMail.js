import nodemailer from "nodemailer";

const sendMail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
  });

  let mailOptions = {
    from: "RahanetCustome@info.com",
    to: options.to,
    subject: options.subject,
    text: "this is text",
    html: options.html,
  };

  return transporter.sendMail(mailOptions);
};

export default sendMail;
