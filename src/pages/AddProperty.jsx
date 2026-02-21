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

export default function AddProperty() {
  const navigate = useNavigate()
  const { session } = UserAuth()

  const [locations, setLocations] = useState([
    { name: '', category: '', phone: '', address: '' }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function addLocation() {
    setLocations(prev => ([...prev, { name: '', category: '', phone: '', address: '' }]))
  }

  function removeLocation(index) {
    setLocations(prev => prev.filter((_, i) => i !== index))
  }

  function updateLocation(index, field, value) {
    setLocations(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: value }
      return copy
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const invalid = locations.some(loc => !loc.name || !loc.address)
      if (invalid) {
        setError('Please provide at least a name and address for every location.')
        setLoading(false)
        return
      }

      const businessId = session?.user?.id || null

      const rows = locations.map(loc => ({
        name: loc.name,
        category: loc.category,
        phone: loc.phone,
        address: loc.address,
        business_id: businessId,
      }))

      const { error: insertErr } = await supabase.from('locations').insert(rows)
      if (insertErr) throw insertErr

      setSuccess('Locations added successfully.')
      setTimeout(() => navigate('/businesses-dashboard'), 800)
    } catch (err) {
      console.error('Insert locations error', err)
      setError(err.message || 'Failed to add locations.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          {locations.map((loc, idx) => (
            <section key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-olivesepia/20">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <img src={info} alt="Info Icon" className="w-4 h-4" />
                  <h3 className="text-lg font-bold text-olivedarkgreen">Location {idx + 1}</h3>
                </div>
                {locations.length > 1 && (
                  <button type="button" onClick={() => removeLocation(idx)} className="text-sm text-red-600 hover:underline">Remove</button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Business Name</label>
                  <input value={loc.name} onChange={e => updateLocation(idx, 'name', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full px-4 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="e.g. NearMeer Coffee - Downtown" type="text" />
                </div>

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

                <div>
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Phone Number</label>
                  <input value={loc.phone} onChange={e => updateLocation(idx, 'phone', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full px-4 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="+1 (555) 000-0000" type="tel" />
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Street Address</label>
                  <div className="relative">
                    <input value={loc.address} onChange={e => updateLocation(idx, 'address', e.target.value)} className="w-full bg-white border border-olivesepia/30 rounded-full pl-4 pr-6 py-3 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="123 Fun Lane, 12345" type="text" />
                  </div>
                </div>
              </div>
            </section>
          ))}

          <div className="flex gap-4 items-center">
            <button type="button" onClick={addLocation} className="px-4 py-2 bg-white border border-olivesepia/20 rounded-full text-olivedarkgreen hover:bg-olivetan transition">Add another location</button>
            <button className="ml-auto bg-olivesepia text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:bg-olivesepia/90 transition-all" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Submit Locations'}</button>
          </div>

          {error && <p className="text-red-700">{error}</p>}
          {success && <p className="text-green-700">{success}</p>}
          <p className="text-center text-sm text-olivedarkgreen/60">
            By submitting this location, you agree to our <a className="text-olivesepia hover:underline font-medium" href="#">Location Quality Standards</a>.
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}