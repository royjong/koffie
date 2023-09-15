import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Schema Definition
const EmailSchema = new mongoose.Schema({
  email: String,
  timestamp: Number,
});

// Model Initialization
let EmailModel;

if (mongoose.models.Email) {
  EmailModel = mongoose.model('Email');
} else {
  EmailModel = mongoose.model('Email', EmailSchema);
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { emailContent } = req.body;

  // Connect to MongoDB
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  // Fetch email addresses from MongoDB
  let emailList;
  try {
    emailList = await EmailModel.find({}, 'email');
  } catch (error) {
    console.error('Error fetching emails:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch emails' });
  }

  // Extract email addresses
  const emailAddresses = emailList.map((doc) => doc.email);

  // Configure nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD, // Use the App Password here
    },
  });

  // Define email data
  const emailData = {
    from: process.env.EMAIL_USER,
    to: emailAddresses.join(', '),
    subject: '☕ Wat gebeurt er allemaal in de wereld? Tijd voor een KoffieMomentje',
    text: emailContent,
  };

  // Send email
  try {
    await transporter.sendMail(emailData);
    res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ success: false, message: 'Could not send emails' });
  }
};