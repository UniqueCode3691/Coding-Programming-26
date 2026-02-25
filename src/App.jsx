// App.jsx - Main application component that sets up routing for the NearMeer platform.
// This component imports all necessary page components and defines the application's route structure.
// It uses React Router for client-side navigation and wraps the app with authentication context.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { AuthContextProvider } from './context/AuthContext'
import AboutUs from './pages/AboutUs'
import ForBusinesses from './pages/ForBusinesses'
import Deals from './pages/Deals'
import Businesses from './pages/Businesses'
import BusinessesDashboard from './pages/BusinessesDashboard'
import BusinessesSignIn from './pages/BusinessesSignIn'
import BusinessesSignUp from './pages/BusinessesSignUp'
import NeighborRoute from './pages/NeighborRoute'
import BusinessRoute from './pages/BusinessRoute'
import AddProperty from './pages/AddProperty'
import NotFound from './pages/NotFound'
import Events from './pages/Events'
import BusinessTemplate from './pages/BusinessTemplate'

// Define the main App component.
// This component serves as the root of the application and sets up the routing structure.
// It wraps the entire app with AuthContextProvider to make authentication state available throughout the app.
export default function App() {
  // Return the JSX structure for the app.
  // AuthContextProvider provides authentication context to all child components.
  // BrowserRouter enables client-side routing using the HTML5 history API.
  // Routes contains all the Route definitions for different pages.
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />
          {/* Alternative route for home */}
          <Route path="/home" element={<Home />} />
          {/* Route for user sign-in page */}
          <Route path="/sign-in" element={<SignIn />} />
          {/* Route for user sign-up page */}
          <Route path="/sign-up" element={<SignUp />} />
          {/* Protected route for user profile, only accessible to authenticated users */}
          <Route path="/profile" element={<NeighborRoute><Profile /></NeighborRoute>} />
          {/* Route for about us page */}
          <Route path="/about-us" element={<AboutUs />} />
          {/* Route for businesses information page */}
          <Route path="/for-businesses" element={<ForBusinesses />} />
          {/* Protected route for deals page, only for authenticated users */}
          <Route path="/deals" element={<NeighborRoute><Deals /></NeighborRoute>} />
          {/* Route for businesses listing page */}
          <Route path="/businesses" element={<Businesses />} />
          {/* Protected route for business dashboard, only for business accounts */}
          <Route path="/businesses-dashboard" element={<BusinessRoute><BusinessesDashboard /></BusinessRoute>} />
          {/* Route for business sign-in */}
          <Route path="/businesses-sign-in" element={<BusinessesSignIn />} />
          {/* Route for business sign-up */}
          <Route path="/businesses-sign-up" element={<BusinessesSignUp />} />
          {/* Protected route for adding property, only for business accounts */}
          <Route path="/add-property" element={<BusinessRoute><AddProperty /></BusinessRoute>} />
          {/* Route for events page */}
          <Route path="/events" element={<Events />} />
          {/* Route for individual business template page, with dynamic id */}
          <Route path="/business/:id" element={<BusinessTemplate />} />
          {/* Catch-all route for 404 not found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}