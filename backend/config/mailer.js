const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Use Mailtrap.io (sandbox mode) [cite: 5]
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER, // [cite: 6]
        pass: process.env.MAILTRAP_PASS  // [cite: 6]
    }
});

// Basic template interpolation (replace with a templating engine for more complex emails)
function interpolateTemplate(templatePath, data) {
    let html = fs.readFileSync(templatePath, 'utf-8');
    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key]);
    }
    return html;
}

exports.sendEmail = async (to, subject, templateName, data) => {
    const templatePath = path.join(__dirname, '../templates', templateName);
    const htmlContent = interpolateTemplate(templatePath, data);

    const mailOptions = {
        from: '"eSaleson No-Reply" <noreply@esaleson.com>',
        to: to,
        subject: subject, // Use separate subject lines for each outcome [cite: 8]
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};