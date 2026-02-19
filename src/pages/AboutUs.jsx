import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import NamanPic from '../assets/NamanPic.webp'
import SalilPic from '../assets/SalilPic.webp'
import SamPic from '../assets/SamPic.webp'

export default function AboutUs() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-6 pb-20 bg-white text-olivedarkgreen">
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

        <section className="pt-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-olivegreen">Our Core Philosophy</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-olivedarkgreen sm:text-4xl">
              Bridging the Gap Between You and Your Neighbors
            </h2>
          </div>

          <div className="mt-10 grid items-center gap-10 rounded-[28px] bg-olivetan/50 border border-olivetan p-8 sm:p-10 md:grid-cols-2">
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
            </div>
          </div>
        </section>
        <section className="pt-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-olivesepia/30 bg-olivetan p-7 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivesepia">storefront</span>
              </div>
              <p className="text-xs font-medium text-olivesepia">Local Shops Joined</p>
              <p className="mt-2 text-2xl font-extrabold text-olivegreen">1,200+</p>
            </div>

            <div className="rounded-2xl border border-olivesepia/30 bg-olivetan p-7 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivesepia">verified</span>
              </div>
              <p className="text-xs font-medium text-olivesepia">Trusted Reviews</p>
              <p className="mt-2 text-2xl font-extrabold text-olivegreen">25k+</p>
            </div>

            <div className="rounded-2xl border border-olivesepia/30 bg-olivetan p-7 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center">
                <span className="material-symbols-outlined text-olivesepia">group</span>
              </div>
              <p className="text-xs font-medium text-olivesepia">Active Neighbors</p>
              <p className="mt-2 text-2xl font-extrabold text-olivegreen">100k+</p>
            </div>
          </div>
        </section>
        <section className="pt-14">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-olivedarkgreen">Meet the Neighbors</h2>
          <p className="mt-1 text-lg text-olivegreen">The passionate team behind the NearMeer platform.</p>

          <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen p-1"
                style={{
                  backgroundImage: `url(${SalilPic})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 1"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Salil Karkhanis</h4>
                <p className="text-sm font-medium text-olivegreen">Lead Designer</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">Enthusiastic about making the world more discoverable, Salil leads the design vision for NearMeer, ensuring every pixel connects neighbors to their local gems.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen/40 p-1"
                style={{
                  backgroundImage: `url(${SamPic})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 2"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Samanyu Mergu</h4>
                <p className="text-sm font-medium text-olivegreen">Chief Engineering</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">Passionate about building scalable and user-friendly platforms, Sam drives NearMeer's technical innovation, making sure every page is meaningful and accessible.</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 text-center">
              <div
                className="size-48 overflow-hidden rounded-full border-4 border-olivegreen/40 p-1"
                style={{
                  backgroundImage: `url(${NamanPic})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                aria-label="Creator portrait 3"
              />

              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold">Naman Kapoor</h4>
                <p className="text-sm font-medium text-olivegreen">Head of Community & Growth</p>
                <p className="mt-2 px-4 text-sm text-olivedarkgreen/55">Driven by the belief that every neighborhood has a story to tell, Naman fosters the heartbeat of NearMeer, ensuring no hidden gem stays hidden for long.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-14">
          <div className="overflow-hidden rounded-[32px] bg-olivedarkgreen px-6 py-14 text-center text-white shadow-soft sm:px-10">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">Ready to discover your<br />neighborhood?</h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-white/75">Join thousands of neighbors who are already discovering the best local secrets.</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a className="rounded-full bg-olivesepia px-7 py-3 text-sm font-semibold text-white hover:bg-olivesepia/90 transition-colors" href="#">Get Started</a>
              <a className="rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors" href="#">Contact Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
