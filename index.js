const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json())

const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASSWORD,
    }
});

app.post("/sendmail", (req, res) => { 
    const {email, subject, message } = req.body;
    console.log(req.body);
        const receivers = {
            from: process.env.USER_NAME,
            to: email,
            subject: subject,
            text: message,
        };

        auth.sendMail(receivers, (err, info) => {
            if (err) {
                console.log(err);
               
                res.end('Failed to send email');
            } else {
                console.log(info);
              
                res.end('Email sent successfully');
            }
        });
    });

    app.listen(8000, () => {
    console.log("Server has started on port 8000");
});
