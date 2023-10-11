const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: true,
        },
    });

    return transporter.sendMail({
        from: 'Contact Support <nguyenlongthanhIT@gmail.com>',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
