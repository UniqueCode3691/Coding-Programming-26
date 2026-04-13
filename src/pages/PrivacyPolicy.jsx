import React, { useEffect } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-olivedarkgreen min-h-screen flex flex-col text-slate-100">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Breadcrumb / Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-olivegreen hover:text-olivetan transition mb-8 font-bold text-sm uppercase tracking-wider">
          <span className="material-icons text-sm">arrow_back</span>
          Back to Home
        </Link>

        {/* Content Container */}
        <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          
          <header className="mb-10 border-b border-gray-100 dark:border-gray-700 pb-8 text-center">
            <h1 className="text-4xl font-bold text-olivetan mb-4">Privacy Policy</h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Last updated: March 08, 2026</p>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm md:text-base leading-relaxed">
            
            <section>
              <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
              <p>We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
            </section>

            <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">Interpretation and Definitions</h2>
            
            <h3 className="text-xl font-semibold mt-6">Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
              {[
                { term: "Company", desc: "Refers to NearMeer." },
                { term: "Cookies", desc: "Small files placed on your device to track browsing history." },
                { term: "Device", desc: "Any device that can access the Service (computer, cell phone, tablet)." },
                { term: "Service", desc: "Refers to the NearMeer Website." },
                { term: "Usage Data", desc: "Data collected automatically (duration of visit, IP address)." },
                { term: "You", desc: "The individual accessing or using the Service." }
              ].map((item, i) => (
                <li key={i} className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl border border-gray-100 dark:border-gray-600">
                  <strong className="text-olivegreen block mb-1">{item.term}</strong>
                  <span className="text-sm opacity-80">{item.desc}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">Collecting and Using Your Personal Data</h2>
            
            <h3 className="text-xl font-semibold mt-6">Types of Data Collected</h3>
            <div className="space-y-4">
              <div className="p-4 bg-olivegreen/5 rounded-2xl border border-olivegreen/10">
                <h4 className="font-bold mb-2">Personal Data</h4>
                <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information including, but not limited to: Email address, First name, and Last name.</p>
              </div>

              <div className="p-4 bg-olivegreen/5 rounded-2xl border border-olivegreen/10">
                <h4 className="font-bold mb-2">Usage Data</h4>
                <p>Usage Data may include information such as Your Device's IP address, browser type, pages visited, and time spent on those pages.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6">Tracking Technologies and Cookies</h3>
            <p>We use Cookies and similar tracking technologies to track activity on Our Service. These help us authenticate users, prevent fraud, and remember your preferences (such as language or login details).</p>

            <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">Retention & Transfer</h2>
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. Generally, Account Information and Support Data are retained for up to 24 months after account closure.</p>

            <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">Security of Your Data</h2>
            <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
              <span className="material-icons">shield</span>
              <p className="text-sm">While We strive to use commercially reasonable means to protect Your Personal Data, remember that no method of transmission over the Internet is 100% secure.</p>
            </div>

            <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, You can contact us:</p>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 p-4 rounded-2xl w-fit">
              <span className="material-icons text-olivegreen">email</span>
              <a href="mailto:samanyu3691@gmail.com" className="font-bold hover:text-olivegreen transition">
                samanyu3691@gmail.com
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;