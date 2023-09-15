import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  email: String,
  timestamp: Number,
});

let EmailModel;

if (mongoose.models.Email) {
  EmailModel = mongoose.model('Email');
} else {
  EmailModel = mongoose.model('Email', EmailSchema);
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!mongoose.connections[0].readyState) {
      // Use new db connection
      await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
    }

    try {
      await new EmailModel({
        email: email,
        timestamp: Date.now(),
      }).save();

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};