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

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<NeighborRoute><Profile /></NeighborRoute>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/for-businesses" element={<ForBusinesses />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/businesses-dashboard" element={<BusinessRoute><BusinessesDashboard /></BusinessRoute>} />
          <Route path="/businesses-sign-in" element={<BusinessesSignIn />} />
          <Route path="/businesses-sign-up" element={<BusinessesSignUp />} />
          <Route path="/add-property" element={<BusinessRoute><AddProperty /></BusinessRoute>} />
          <Route path="/events" element={<Events />} />
          <Route path="/business/:id" element={<BusinessTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}