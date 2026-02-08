import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'

export default function AboutUs() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-20 bg-olivetan text-olivedarkgreen">
        {/* Hero */}
        <section className="pt-4">
          <div
            className="relative overflow-hidden rounded-[34px] shadow-soft"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1520975693411-bd2f1f65d1ad?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-olivedarkgreen/55"></div>

            <div className="relative flex min-h-[440px] flex-col items-center justify-center px-6 text-center">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
                Connecting Neighbors,<br />
                Supporting Local
              </h1>

              <p className="mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
                Our mission is to bridge the gap between small businesses and the
                vibrant communities they serve.
              </p>

              <a className="mt-7 rounded-full bg-olivegreen px-6 py-3 text-sm font-semibold text-olivetan shadow-sm hover:brightness-95" href="#">
                Explore Near You
              </a>
            </div>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="pt-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-olivegreen">Our Core Philosophy</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-olivedarkgreen sm:text-4xl">
              Bridging the Gap Between You and Your Neighbors
            </h2>
          </div>

          <div className="mt-10 grid items-center gap-10 rounded-[28px] bg-olivetan p-8 sm:p-10 md:grid-cols-2">
            <div
              className="h-56 w-full overflow-hidden rounded-2xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1600&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              aria-label="Open sign"
            />

            <div>
              <h3 className="text-xl font-extrabold text-olivedarkgreen">Empowering Small Business</h3>
              <p className="mt-3 text-sm leading-6 text-olivedarkgreen/60">
                We believe every neighborhood has hidden gems waiting to be
                discovered. NearMeer was built to give local entrepreneurs a
                voice and neighbors a trusted way to find the best services right
                around the corner. Our platform transforms how people interact
                with their local economy.
              </p>

              <a className="mt-6 inline-flex rounded-full bg-olivegreen px-4 py-2 text-xs font-semibold text-olivetan shadow-sm hover:brightness-95" href="#">Read Our Vision</a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pt-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-olivedarkgreen/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivegreen">storefront</span>
              </div>
              <p className="text-xs font-medium text-olivegreen">Local Shops Joined</p>
              <p className="mt-2 text-2xl font-extrabold text-olivedarkgreen">1,200+</p>
            </div>

            <div className="rounded-2xl border border-olivedarkgreen/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivegreen">verified</span>
              </div>
              <p className="text-xs font-medium text-olivegreen">Trusted Reviews</p>
              <p className="mt-2 text-2xl font-extrabold text-olivedarkgreen">25k+</p>
            </div>

            <div className="rounded-2xl border border-olivedarkgreen/10 bg-white p-7 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivegreen">group</span>
              </div>
              <p className="text-xs font-medium text-olivegreen">Active Neighbors</p>
              <p className="mt-2 text-2xl font-extrabold text-olivedarkgreen">100k+</p>
            </div>
          </div>
        </section>

        {/* Meet the Neighbors */}
        <section className="pt-14">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-olivedarkgreen">Meet the Neighbors</h2>
          <p className="mt-1 text-lg text-olivegreen">The passionate team behind the NearMeer platform.</p>

          <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen p-1"
                style={{
                  backgroundImage: "url(SalilPic.webp)",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 1"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Salil Karkhanis</h4>
                <p className="text-sm font-medium text-olivegreen">Lead Designer</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">Enthusiactic about making the world more discoverable, Salil leads the design vision for NearMeer, ensuring every pixel connects neighbors to their local gems.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen/40 p-1"
                style={{
                  backgroundImage: "url(SamPic.webp)",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 2"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Samanyu Mergu</h4>
                <p className="text-sm font-medium text-olivegreen">Chief Engineering</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">Passionate about building scalable and user-friendly platforms, Samanyu drives NearMeer's technical innovation.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen/40 p-1"
                style={{
                  backgroundImage: "url(NamanBaboon.webp)",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 3"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Naman Kapoor</h4>
                <p className="text-sm font-medium text-olivegreen">Curry Muncher</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">kinda just eats food all day</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-14">
          <div className="overflow-hidden rounded-[32px] bg-olivedarkgreen px-6 py-14 text-center text-white shadow-soft sm:px-10">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">Ready to discover your<br />neighborhood?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-white/75">Join thousands of neighbors who are already discovering the best local secrets.</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a className="rounded-full bg-olivegreen px-7 py-3 text-sm font-semibold text-olivetan hover:brightness-95" href="#">Get Started</a>
              <a className="rounded-full border border-white/25 bg-white/0 px-7 py-3 text-sm font-semibold text-white hover:bg-white/5" href="#">Contact Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
