const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/subscribe', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Ensuring no empty field
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'omoge82@gmail.com', // Your Gmail email address
            pass: 'ysojuewprrkiwezj' // Your Gmail password
        }
    });

    const mailOptions = {
        from: 'omoge82@gmail.com', // Your Gmail email address
        to: 'omoge82@gmail.com', // Your Gmail email address
        subject: 'New Subscriber',
        text: `New subscriber details:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            // If email sent successfully, redirect to success.html
            res.redirect('/success.html');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
