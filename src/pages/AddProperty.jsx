// AddProperty.jsx - Component for business owners to add new locations.
// This component allows authenticated business users to add multiple locations for their business.
// It handles form state for locations, validation, and submission to Supabase.

import React, { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import right from "../assets/icons/right.png"
import { Link } from 'react-router-dom'
import map from "../assets/icons/map.png"
import info from "../assets/icons/info.png"
import search from "../assets/search_image.svg"
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../SupabaseClient'
import { useNavigate } from 'react-router-dom'

// AddProperty functional component.
// Manages state for multiple business locations and handles form submission.
export default function AddProperty() {
  // Hook for navigation after successful submission.
  const navigate = useNavigate()

  // Get user session from auth context.
  const { session } = UserAuth()

  // State for storing array of location objects.
  // Each location has name, category, phone, and address.
  const [locations, setLocations] = useState([
    { name: '', category: '', phone: '', address: '' }
  ])

  // State for loading indicator during submission.
  const [loading, setLoading] = useState(false)

  // State for error messages.
  const [error, setError] = useState('')

  // State for success messages.
  const [success, setSuccess] = useState('')

  // Function to add a new location to the locations array.
  // Appends a new empty location object.
  function addLocation() {
    setLocations(prev => ([...prev, { name: '', category: '', phone: '', address: '' }]))
  }

  // Function to remove a location from the array by index.
  // Filters out the location at the specified index.
  function removeLocation(index) {
    setLocations(prev => prev.filter((_, i) => i !== index))
  }

  // Function to update a specific field of a location.
  // Creates a copy of the locations array and updates the field at the given index.
  function updateLocation(index, field, value) {
    setLocations(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  // Function to handle form submission.
  // Validates locations, generates images, and inserts data into Supabase.
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // Check if all locations have required fields.
      const invalid = locations.some(loc => !loc.name || !loc.address)
      if (invalid) {
        setError('Please provide at least a name and address for every location.')
        setLoading(false)
        return
      }

      // Get business ID from session.
      const businessId = session?.user?.id || null

      // Process each location for submission.
      const rows = locations.map((loc, index) => {
        return {
          name: loc.name,
          category: loc.category,
          phone: loc.phone,
          address: loc.address,
          business_id: businessId,
        }
      })

      // Insert locations into Supabase 'locations' table.
      const { error: insertErr } = await supabase.from('locations').insert(rows)
      if (insertErr) throw insertErr

      // Set success message and navigate to dashboard.
      setSuccess('Locations added successfully.')
      setTimeout(() => navigate('/businesses-dashboard'), 800)
    } catch (err) {
      console.error('Insert locations error', err)
      setError(err.message || 'Failed to add locations.')
    } finally {
      setLoading(false)
    }
  }

  // Render the component UI.
  return (
    <>
      {/* Header component. */}
      <Header />

      {/* Main content area. */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb navigation and title section. */}
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-sm text-olivedarkgreen/60 mb-4">
            <Link className="hover:text-olivesepia" to="/businesses-dashboard">Dashboard</Link>
            <img src={right} alt="right arrow" className="w-4 h-4" />
            <span className="text-olivedarkgreen font-medium">Add New Location</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold tracking-tight text-olivedarkgreen">Add a New Business Location</h2>
              <p className="text-olivedarkgreen/60 max-w-xl">Expand your reach by adding a new branch or service point to the NearMeer network.</p>
            </div>
            <Link to="/businesses-dashboard" className="inline-flex items-center gap-2 text-olivesepia font-bold hover:underline">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form for adding locations. */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Map over locations to render each location section. */}
          {locations.map((loc, idx) => (
            <section key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-olivesepia/20">
              {/* Location header with remove button. */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={info} alt="Info Icon" className="w-4 h-4" />
                  <h3 className="text-lg font-bold text-olivedarkgreen">Location {idx + 1}</h3>
                </div>
                {/* Show remove button if more than one location. */}
                {locations.length > 1 && (
                  <button type="button" onClick={() => removeLocation(idx)} className="text-sm text-red-600 hover:underline">Remove</button>
                )}
              </div>

              {/* Form fields for the location. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Business name input. */}
                <div className="col-span-full">
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Business Name</label>
                  <input value={loc.name} onChange={e => updateLocation(idx, 'name', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full px-4 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="e.g. NearMeer Coffee - Downtown" type="text" />
                </div>

                {/* Category select dropdown. */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Category</label>
                  <select value={loc.category} onChange={e => updateLocation(idx, 'category', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full px-4 py-3 text-olivedarkgreen focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none appearance-none">
                    <option value="">Select category</option>
                    <option value="Cafe & Restaurant">Cafe &amp; Restaurant</option>
                    <option value="Retail Store">Retail Store</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Boutique">Boutique</option>
                  </select>
                </div>

                {/* Phone number input. */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Phone Number</label>
                  <input value={loc.phone} onChange={e => updateLocation(idx, 'phone', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full px-4 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                </div>

                {/* Address input. */}
                <div className="col-span-full">
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Street Address</label>
                  <div className="relative">
                    <input value={loc.address} onChange={e => updateLocation(idx, 'address', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full pl-4 pr-6 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="123 Fun Lane, 12345" type="text" />
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Action buttons: Add location and Submit. */}
          <div className="flex gap-4 items-center">
            <button type="button" onClick={addLocation} className="px-4 py-2 bg-white border border-olivesepia/20 rounded-full text-olivedarkgreen hover:bg-olivetan transition">Add another location</button>
            <button className="ml-auto bg-olivesepia text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:bg-olivesepia/90 transition-all" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Submit Locations'}</button>
          </div>

          {/* Display error or success messages. */}
          {error && <p className="text-red-700">{error}</p>}
          {success && <p className="text-green-700">{success}</p>}
        </form>
      </main>

      {/* Footer component. */}
      <Footer />
    </>
  )
}