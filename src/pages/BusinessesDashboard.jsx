import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../SupabaseClient'
import trendingup from "../assets/icons/trendingup.png"
import checkcircle from "../assets/icons/checkcircle.png"
import person from "../assets/icons/person.png"
import priorityhigh from "../assets/icons/priorityhigh.png"
import left from "../assets/icons/left.png"
import right from "../assets/icons/right.png"
import locationon from "../assets/icons/locationon.png"

export default function BusinessesDashboard() {
  const {session, loading, signOut} = UserAuth()
  const [profile, setProfile] = useState(null)
  const [properties, setProperties] = useState([])
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [propActionLoading, setPropActionLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    const loadProfile = async () => {
      try {
        if (!session?.user?.id) return
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        if (mounted && !error) setProfile(data)
      } catch (err) {
        console.error('Failed to load profile for dashboard:', err)
      }
    }

    loadProfile()
    const loadProperties = async () => {
      setPropertiesLoading(true)
      try {
        if (!session?.user?.id) return
        const { data, error } = await supabase
          .from('locations')
          .select('*')
          .eq('business_id', session.user.id)
          .order('id', { ascending: false })
        if (!error) setProperties(data || [])
      } catch (err) {
        console.error('Failed to load properties for dashboard:', err)
      } finally {
        setPropertiesLoading(false)
      }
    }

    loadProperties()
    return () => { mounted = false }
  }, [session])

  if (loading) return <div className="p-8">Loading...</div>
  return (
    <>
      <Header />
      <div className="bg-olivetan min-h-screen">
        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-olivedarkgreen">Welcome back, {(profile?.full_name || session?.user?.user_metadata?.name || session?.user?.email || '').split(' ')[0]}</h1>
            <p className="text-olivedarkgreen/60">Here's what's happening with your portfolio today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">$24,850</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <img src={trendingup} alt="Trending Up" className="w-4 h-4" />
                <span>12.5% this month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Occupancy Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">94%</h3>
              <div className="mt-2 flex items-center gap-1 text-olivegreen text-sm">
                <img src={checkcircle} alt="Check Circle" className="w-4 h-4" />
                <span>Optimal level</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Active Tenants</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">42</h3>
              <div className="mt-2 flex items-center gap-1 text-olivedarkgreen/40 text-sm">
                <img src={person} alt="Person" className="w-4 h-4" />
                <span>Across 8 properties</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Pending Tasks</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">7</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <img src={priorityhigh} alt="Priority High" className="w-4 h-4" />
                <span>3 Urgent repairs</span>
              </div>
            </div>
          </div>
          <section className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-olivedarkgreen">Your Properties</h2>
              <div className="flex gap-2">
                <Link to="/add-property" className="px-4 py-2 bg-olivegreen text-white rounded-full hover:opacity-90">Add Location</Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {propertiesLoading ? (
                <div className="col-span-full flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olivegreen"></div>
                </div>
              ) : properties && properties.length > 0 ? properties.map(prop => (
                <div key={prop.id} className="bg-white rounded-2xl overflow-hidden border border-olivesepia/30 shadow-sm hover:shadow-md transition-shadow">
                  {editingId === prop.id ? (
                    <div className="p-5">
                      <div className="space-y-3">
                        <input value={editForm.name || ''} onChange={(e) => setEditForm(f => ({...f, name: e.target.value}))} className="w-full bg-white border border-olivesepia/30 rounded px-3 py-2" placeholder="Location name" />
                        <input value={editForm.address || ''} onChange={(e) => setEditForm(f => ({...f, address: e.target.value}))} className="w-full bg-white border border-olivesepia/30 rounded px-3 py-2" placeholder="Address" />
                        <input value={editForm.image || ''} onChange={(e) => setEditForm(f => ({...f, image: e.target.value}))} className="w-full bg-white border border-olivesepia/30 rounded px-3 py-2" placeholder="Image URL (optional)" />
                        <select value={editForm.status || ''} onChange={(e) => setEditForm(f => ({...f, status: e.target.value}))} className="w-full bg-white border border-olivesepia/30 rounded px-3 py-2">
                          <option value="">Status (optional)</option>
                          <option value="OCCUPIED">OCCUPIED</option>
                          <option value="VACANT">VACANT</option>
                          <option value="LISTED">LISTED</option>
                        </select>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button onClick={async () => {
                          try {
                            setPropActionLoading(true)
                            const { data, error } = await supabase.from('locations').update(editForm).eq('id', prop.id).select().single()
                            if (error) throw error
                            setProperties(prev => prev.map(p => p.id === prop.id ? data : p))
                            setEditingId(null)
                          } catch (err) {
                            console.error('Failed to save property:', err)
                          } finally {
                            setPropActionLoading(false)
                          }
                        }} disabled={propActionLoading} className="px-3 py-2 bg-olivegreen text-white rounded">{propActionLoading ? 'Saving...' : 'Save'}</button>
                        <button onClick={() => { setEditingId(null); setEditForm({}) }} className="px-3 py-2 border rounded">Cancel</button>
                        <button onClick={async () => {
                          if (!confirm('Delete this location? This action cannot be undone.')) return
                          try {
                            setPropActionLoading(true)
                            const { error } = await supabase.from('locations').delete().eq('id', prop.id)
                            if (error) throw error
                            setProperties(prev => prev.filter(p => p.id !== prop.id))
                          } catch (err) {
                            console.error('Failed to delete property:', err)
                          } finally {
                            setPropActionLoading(false)
                          }
                        }} disabled={propActionLoading} className="ml-auto px-3 py-2 bg-red-600 text-white rounded">{propActionLoading ? 'Deleting...' : 'Delete'}</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative h-48">
                        <img alt={prop.name} className="w-full h-full object-cover" src={prop.image || `https://loremflickr.com/800/480/${encodeURIComponent(prop.name || 'property')}?lock=${prop.id}`} />
                        <span className={`absolute top-4 left-4 text-white text-xs font-bold px-2.5 py-1 rounded-full ${prop.status === 'VACANT' ? 'bg-olivesepia' : 'bg-olivegreen'}`}>{prop.status || 'LISTED'}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-olivedarkgreen">{prop.name || 'Untitled Location'}</h3>
                        <p className="text-olivedarkgreen/60 text-sm mt-1 flex items-center gap-1">
                          <img src={locationon} alt="Location Icon" className="w-4 h-4" />
                          {prop.address || prop.city || 'Address not provided'}
                        </p>
                        <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                          <span className="text-xs text-olivedarkgreen/40 font-medium">DATE POSTED: {new Date(prop.created_at || prop.id).toLocaleDateString()}</span>
                          <div className="flex items-center gap-2">
                            <Link to={`/business/${prop.id}`} state={{ businessData: prop }} className="text-olivesepia text-sm font-bold hover:underline">View Details</Link>
                            <button onClick={() => { setEditingId(prop.id); setEditForm({ name: prop.name, address: prop.address, image: prop.image, status: prop.status }) }} className="ml-2 text-sm px-3 py-1 border rounded">Edit</button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">You haven't added any business locations yet. Click "Add Location" to add your first one.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}