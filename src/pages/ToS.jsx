import React, { useEffect } from 'react';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-olivedarkgreen min-h-screen flex flex-col text-slate-100">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-olivegreen hover:text-olivetan transition mb-8 font-bold text-sm uppercase tracking-wider">
          <span className="material-icons text-sm">arrow_back</span>
          Back to Home
        </Link>

        <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          
          <header className="mb-10 border-b border-gray-100 dark:border-gray-700 pb-8 text-center">
            <h1 className="text-4xl font-bold text-olivetan mb-4">Terms of Service</h1>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Effective Date: March 08, 2026</p>
          </header>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm md:text-base leading-relaxed">
            
            {/* 1. Acceptance & Age */}
            <section>
              <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">1. Acceptance & Eligibility</h2>
              <p>By accessing **NearMeer**, you agree to these Terms. You must be at least **13 years of age** to use this Service. By using NearMeer, you represent and warrant that you meet this age requirement.</p>
            </section>

            {/* 2. User Content */}
            <section>
              <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">2. User-Generated Content</h2>
              <p>Our Service allows you to post reviews and feedback. You retain ownership of your content, but by posting on NearMeer, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute that content.</p>
              <div className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-xl mt-3 text-sm border-l-2 border-olivegreen">
                <strong>Prohibited Content:</strong> You may not post reviews that are defamatory, obscene, threatening, or violate the intellectual property rights of others.
              </div>
            </section>

            {/* 3. Data Sources */}
            <section>
              <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">3. Data & Mapping</h2>
              <p>NearMeer utilizes data from **OpenStreetMap** (OSM). Business locations, categories, and geographic data are provided "as-is" via the Overpass API. We are not responsible for inaccuracies in mapping data provided by these open-source contributors.</p>
            </section>

            {/* 4. Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">4. Limitation of Liability</h2>
              <p className="italic">To the maximum extent permitted by law, NearMeer shall not be liable for any damages resulting from your use of the service or your reliance on any business information found herein.</p>
            </section>

            {/* 5. Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-olivetan mt-10 border-l-4 border-olivegreen pl-4">5. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the **State of New York, United States**, without regard to its conflict of law provisions.</p>
            </section>

            {/* 6. Contact */}
            <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-olivetan mb-4">Contact Information</h2>
              <p>For questions regarding these Terms, please contact:</p>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 p-4 rounded-2xl w-fit mt-4">
                <span className="material-icons text-olivegreen">email</span>
                <a href="mailto:samanyu3691@gmail.com" className="font-bold hover:text-olivegreen transition">
                  samanyu3691@gmail.com
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;