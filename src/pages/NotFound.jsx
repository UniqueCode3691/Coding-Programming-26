import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-olivetan">
      <h1 className="text-9xl font-bold text-olivegreen">404</h1>
      <p className="text-2xl font-semibold mt-4">Oops! This neighborhood doesn't exist.</p>
      <p className="text-gray-600 mt-2">The page you're looking for might have moved or never was.</p>
      <Link 
        to="/" 
        className="mt-8 bg-olivegreen text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;