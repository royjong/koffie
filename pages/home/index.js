import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const res = await fetch('/api/saveEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.status === 200) {
        setMessage('Bedankt voor je aanmelding!');
        setEmail(''); // Clear the email input field
      } else {
        setMessage('Er ging iets mis. Probeer het opnieuw.');
      }
    } catch (error) {
      setMessage('Er ging iets mis. Probeer het opnieuw.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <img className='w-24 md:w-[250px]' src="https://i.ibb.co/C0gGXvt/KOFFIE-removebg-preview.png" />
          <div className="space-x-4">
            <a href="#" className="text-gray-600">Home</a>
            <a href="#" className="text-gray-600">Partner contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[50vh] lg:h-[70vh] bg-white text-dark px-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4">
            Lees elke ochtend het belangrijkste nieuws binnen 1 minuut in je mailbox!☕
          </h1>
          <p className="text-sm md:text-md lg:text-lg text-gray-700 mb-2 md:mb-4">
            Meld je gratis aan, en ontvang elke dag om stipt 08:00 het nieuws in een overzichtelijk formaat in je mail!
          </p>
          <form className="space-y-4 w-full max-w-xs md:max-w-md mx-auto" onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              placeholder="youremail@domain.com" 
              className="w-full p-4 rounded-lg bg-opacity-80"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit" className="w-full p-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Yes, send me news!
            </button>
            {message && <p className="mt-4 text-indigo-200">{message}</p>}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 py-8 mt-auto">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <a href="#" className="block">Contact Page</a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <p>KVK: 12345678</p>
              <p>BTW: NL123456789B01</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mail</h3>
              <p>info@example.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Partners</h3>
              <a href="#" className="block">Partner Page</a>
            </div>
          </div>
          <div className="mt-4">
            <p>&copy; 2023 KoffieMomentje. All rights reserved.</p>
          </div>
        </div>
        </footer>
    </div>
  );
}