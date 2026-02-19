import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const BusinessRoute = ({ children }) => {
  const { session, loading } = UserAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) return <Navigate to="/businesses-sign-in" />;

  if (session?.user?.user_metadata?.account_type === 'user') {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default BusinessRoute;