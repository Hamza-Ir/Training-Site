const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Import the cors package

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors()); // Use CORS middleware

// Middleware to parse URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // Replace with your Gmail address
    pass: "", // Replace with your Gmail App Password
  },
});

// POST route to handle form submissions
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email, // User's email
    to: "", // Your email
    subject: `New message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending message.");
    }
    res.status(200).send("Message sent successfully!");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
