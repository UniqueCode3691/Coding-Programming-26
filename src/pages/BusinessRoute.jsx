// BusinessRoute.jsx - Route guard for business-only pages.
// This component protects routes that should only be accessible to authenticated users with 'business' account type.
// It redirects regular users to their profile and unauthenticated users to business sign-in.

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// BusinessRoute component that wraps protected business routes.
// Checks authentication and account type, redirects if necessary.
const BusinessRoute = ({ children }) => {
  const { session, loading } = UserAuth();

  // Show loading while authentication is being checked.
  if (loading) return <div>Loading...</div>;

  // Redirect to business sign-in if not authenticated.
  if (!session) return <Navigate to="/businesses-sign-in" />;

  // Redirect regular users to their profile.
  if (session?.user?.user_metadata?.account_type === 'user') {
    return <Navigate to="/profile" />;
  }

  // Render the protected children if user is authenticated and has business account type.
  return children;
};

export default BusinessRoute;