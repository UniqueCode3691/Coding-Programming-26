// NeighborRoute.jsx - Route guard for user-only pages.
// This component protects routes that should only be accessible to authenticated users with 'user' account type.
// It redirects business accounts to their dashboard and unauthenticated users to sign-in.

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// NeighborRoute component that wraps protected user routes.
// Checks authentication and account type, redirects if necessary.
const NeighborRoute = ({ children }) => {
  const { session, loading } = UserAuth();

  // Show loading while authentication is being checked.
  if (loading) return <div>Loading...</div>;

  // Redirect to sign-in if not authenticated.
  if (!session) return <Navigate to="/sign-in" />;

  // Redirect business accounts to their dashboard.
  if (session?.user?.user_metadata?.account_type === 'business') {
    return <Navigate to="/businesses-dashboard" />;
  }

  // Render the protected children if user is authenticated and has user account type.
  return children;
};

export default NeighborRoute;