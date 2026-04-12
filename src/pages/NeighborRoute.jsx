// NeighborRoute.jsx - Route guard for user-only pages.
// This component protects routes that should only be accessible to authenticated users with 'user' account type.
// It redirects business accounts to their dashboard and unauthenticated users to sign-in.

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// NeighborRoute component that wraps protected user routes.
// Checks authentication and account type, redirects if necessary.
const NeighborRoute = ({ children }) => {
  const { session, loading } = UserAuth();

  // If session is explicitly null and not loading, we know they are logged out
  if (!loading && !session) {
    return <Navigate to="/sign-in" />;
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-olivedarkgreen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (session?.user?.user_metadata?.account_type === 'business') {
    return <Navigate to="/businesses-dashboard" />;
  }

  return children;
};

export default NeighborRoute;