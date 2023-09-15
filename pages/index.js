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
        <div className="container mx-auto flex items-center justify-between flex-wrap">
          <img className='w-16 md:w-24' src="https://i.ibb.co/C0gGXvt/KOFFIE-removebg-preview.png" alt="Logo" />
          <div className="space-x-2 md:space-x-4">
            <a href="#" className="text-gray-600">Partner contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-full md:h-[50vh] lg:h-[70vh] bg-white text-dark px-4 py-8 md:py-16">
        <div className="text-center w-full md:w-2/3 lg:w-1/2">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Wil jij elke ochtend 08:00 het ECHTE nieuws ontvangen?☕
          </h1>
          <ul className="list-inside text-left text-sm md:text-md lg:text-lg text-gray-700 mb-4 pl-0">
  <li className="flex items-center">
    <span className="text-green-500 mr-2">✓</span>
    <span> Elke ochtend 08:00 krijg je een opsomming van het belangrijkste nieuws!</span>
  </li>
  <li className="flex items-center">
    <span className="text-green-500 mr-2">✓</span>
    <span> Wij gebruiken A.I om op grote schaal nepnieuws te ontmaskeren & geven jou het echte nieuws!</span>
  </li>
  <li className="flex items-center">
    <span className="text-green-500 mr-2">✓</span>
    <span> De media wilt je dom houden, wij maken je slimmer!</span>
  </li>
</ul>
          <form className="space-y-4 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              placeholder="youremail@domain.com" 
              className="w-full p-4 rounded-lg border border-indigo-600 focus:ring-2 focus:ring-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            <button type="submit" className="w-full p-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300">
              Ja, stuur mij de waarheid!
            </button>
            {message && <p className="mt-4 text-indigo-200">{message}</p>}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 py-8">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <a href="#" className="block">Contact Page</a>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <p>KVK: 86555596</p>
              <p>Hoofdkantoor: De Nieuwe Erven 3 Unit 108845431NVCuijk</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mail</h3>
              <p>partners@koffie-momentje.nl</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Partners</h3>
              <a href="#" className="block">Partner Contacte</a>
              <a href="#" className="block">Onze partners</a>
            </div>
          </div>
          <div className="mt-4">
            <p>&copy; 2023 Koffie-Momentje.nl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
