// Index.jsx - Entry point for the React application.
// This file renders the root App component into the DOM using React's createRoot API.
// It uses StrictMode to enable additional development checks and warnings.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create a root for the React application and render the App component.
// document.getElementById('root') targets the div with id 'root' in the HTML file.
// StrictMode wraps the App to activate additional checks in development mode.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
