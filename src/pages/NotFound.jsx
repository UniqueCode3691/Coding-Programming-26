// NotFound.jsx - 404 Not Found page component.
// This component is displayed when a user navigates to a non-existent route.
// It provides a friendly message and a link back to the home page.

import { Link } from 'react-router-dom';

// NotFound functional component.
// Renders a centered 404 page with title, message, and home link.
const NotFound = () => {
  return (
    // Full-screen container with background color.
    <div className="flex flex-col items-center justify-center h-screen bg-olivetan">
      {/* Large 404 heading. */}
      <h1 className="text-9xl font-bold text-olivegreen">404</h1>
      {/* Subtitle message. */}
      <p className="text-2xl font-semibold mt-4">Oops! This neighborhood doesn't exist.</p>
      {/* Description text. */}
      <p className="text-gray-600 mt-2">The page you're looking for might have moved or never was.</p>
      {/* Link button to go back home. */}
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