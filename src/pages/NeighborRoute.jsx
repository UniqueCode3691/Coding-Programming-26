import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const NeighborRoute = ({ children }) => {
  const { session, profile, loading } = UserAuth();

  if (loading) return <div>Loading...</div>;

  if (!session) return <Navigate to="/sign-in" />;

  if (profile?.account_type === 'business') {
    return <Navigate to="/businesses-dashboard" />;
  }

  return children;
};

export default NeighborRoute;