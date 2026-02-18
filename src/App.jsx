import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { AuthContextProvider } from './context/AuthContext'
import PrivateRoute from './pages/PrivateRoute'
import AboutUs from './pages/AboutUs'
import ForBusinesses from './pages/ForBusinesses'
import Deals from './pages/Deals'
import BusinessesDashboard from './pages/BusinessesDashboard'
import BusinessesSignIn from './pages/BusinessesSignIn'
import BusinessesSignUp from './pages/BusinessesSignUp'

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/for-businesses" element={<ForBusinesses />}></Route>
          <Route path="/deals" element={<Deals />}></Route>
          <Route path="/businesses-dashboard" element={<BusinessesDashboard />}></Route>
          <Route path="/businesses-sign-in" element={<BusinessesSignIn />}></Route>
          <Route path="/businesses-sign-up" element={<BusinessesSignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}