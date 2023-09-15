import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [emailContent, setEmailContent] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  const fetchEmail = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/generate-email');
      setEmailContent(res.data.generated_email);
    } catch (error) {
      console.error('There was an error fetching the email', error);
    }
  };

  const fetchSubscribedEmails = async () => {
    try {
      const res = await axios.get('/api/getEmail');
      setSubscribedEmails(res.data.emails);
    } catch (error) {
      console.error('There was an error fetching the subscribed emails', error);
    }
  };

  const sendEmailToSubscribers = async () => {
    try {
      const res = await axios.post('/api/sendEmails', {
        emailContent,
      });

      if (res.status === 200) {
        console.log('Emails sent successfully');
      }
    } catch (error) {
      console.error('There was an error sending the emails', error);
    }
  };

  useEffect(() => {
    fetchSubscribedEmails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
    <nav className="bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-indigo-600 text-2xl font-bold">Koffie Momentje Dashboard</div>
        <div className="space-x-4">
          <button className="text-gray-600" onClick={fetchEmail}>Generate New Email</button>
          <button className="text-gray-600" onClick={sendEmailToSubscribers}>Send to Email List</button>
        </div>
      </div>
    </nav>

    <section className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Email Subscribers */}
        <div className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Latest Subscribed Emails</h2>
          <div className="h-[200px] overflow-y-auto">
            <ul>
              {subscribedEmails.slice(0, 20).map((item, index) => (
                <li key={index} className="mb-2 text-gray-700">{item.email}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Placeholder */}
        <div className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Card 2 Placeholder</h2>
          <p className="text-gray-700">Content for card 2.</p>
        </div>

        {/* Card 3: Placeholder */}
        <div className="rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Card 3 Placeholder</h2>
          <p className="text-gray-700">Content for card 3.</p>
        </div>
      </div>

      {emailContent && (
        <div className="mt-8 rounded bg-white p-4 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Generated Email</h2>
          <p className="text-gray-700">{emailContent}</p>
        </div>
      )}
    </section>
  </div>
  );
}
