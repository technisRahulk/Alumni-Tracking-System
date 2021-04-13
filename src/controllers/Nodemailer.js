const nodemailer = require('nodemailer');
require("dotenv").config();
const cryptoRandomString = require("crypto-random-string");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

exports.contact = (data) => {
	var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    	}
  	});
	
	const output = `
    <p>You have a new request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${data.name}</li>
      <li>Subject: ${data.subject}</li>
      <li>Email: ${data.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${data.message}</p>`;
	
	let mailContent = `A ATS Report has been issued.<p>Name - ${data.name}</p><p>Email Id - ${data.email}</p><p>Subject - ${data.subject}</p><p>Message - ${data.message}</p>`;
	
	var mailOptions =  {
		from: process.env.NODEMAILER_SECONDARYEMAIL,
		to: process.env.NODEMAILER_EMAIL,
		subject: `ATS Issue`,
		html: output
	};

	transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
	
}
	
	