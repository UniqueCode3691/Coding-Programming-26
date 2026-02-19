import React, { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import right from "../assets/icons/right.png"
import { Link } from 'react-router-dom'
import map from "../assets/icons/map.png"
import info from "../assets/icons/info.png"
import search from "../assets/search_image.svg"

export default function AddProperty() {
  const {formData, setFormData} = useState({
    name: "",
    category: "",
    phone: "",
    address: "",
  })
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
        <form className="space-y-12">
          {/* Section 1: Basic Information */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-olivesepia/20">
            <div className="flex items-center gap-3 mb-8">
              <img src={info} alt="Info Icon" className="w-4 h-4" />
              <h3 className="text-xl font-bold text-olivedarkgreen">Basic Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Business Name</label>
                <input onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white border border-olivesepia/30 rounded-full px-6 py-4 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="e.g. NearMeer Coffee - Downtown" type="text"/>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Category</label>
                <select onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-white border border-olivesepia/30 rounded-full px-6 py-4 text-olivedarkgreen focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none appearance-none">
                  <option>Cafe &amp; Restaurant</option>
                  <option>Retail Store</option>
                  <option>Service Provider</option>
                  <option>Boutique</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Phone Number</label>
                <input onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-white border border-olivesepia/30 rounded-full px-6 py-4 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="+1 (555) 000-0000" type="tel"/>
              </div>
            </div>
          </section>
          <section className="bg-white p-8 rounded-xl shadow-sm border border-olivesepia/20">
            <div className="flex items-center gap-3 mb-8">
              <img src={map} alt="Map Icon" className="w-4 h-4" />
              <h3 className="text-xl font-bold text-olivedarkgreen">Physical Address</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-olivedarkgreen">Street Address</label>
                <div className="relative">
                  <input onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-white border border-olivesepia/30 rounded-full pl-5 pr-6 py-4 text-olivedarkgreen placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-olivesepia focus:border-transparent outline-none" placeholder="123 Fun Lane, 12345" type="text"/>
                </div>
              </div>
            </div>
          </section>
          <div className="flex flex-col md:flex-row gap-4 pt-8 border-t border-olivesepia/10">
            <button className="flex-1 bg-olivesepia text-white font-bold text-lg py-5 rounded-full shadow-lg shadow-olivesepia/20 hover:bg-olivesepia/90 transition-all flex items-center justify-center gap-2 group" type="submit">
              Submit Location
            </button>
          </div>
          <p className="text-center text-sm text-olivedarkgreen/60">
            By submitting this location, you agree to our <a className="text-olivesepia hover:underline font-medium" href="#">Location Quality Standards</a>.
          </p>
        </form>
      </main>
      <Footer />
    </>
  )
}