import mongoose from 'mongoose';

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
  if (req.method === 'GET') {
    try {
      // Check if MongoDB is connected
      if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGODB_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
      }
      // Fetch emails from the database
      const emails = await EmailModel.find({}, 'email timestamp');
      // Respond with success status and the list of emails
      res.status(200).json({ success: true, emails });
    } catch (error) {
      console.error('Error fetching emails:', error);
      // Respond with an error status and message
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    // Method not allowed
    res.status(405).end();
  }
};