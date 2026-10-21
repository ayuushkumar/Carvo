
import './App.css'

function App() {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <a href="/" className="text-2xl font-bold tracking-tight text-emerald-700">
              carvo<span className="text-slate-900">.</span>
            </a>

            <div className="hidden items-center gap-8 text-sm font-medium md:flex">
              <a href="#how-it-works" className="hover:text-emerald-700">
                How it works
              </a>
              <a href="#benefits" className="hover:text-emerald-700">
                Why Carvo
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-100">
                Log in
              </button>
              <button className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                Sign up
              </button>
            </div>
          </nav>
        </header>

        <main>
          <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              Better journeys, together
            </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
                Your journey.
                <span className="block text-emerald-700">Shared smarter.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Find people going your way, share the ride, and make every trip
                more affordable. Travel together with Carvo.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800">
                  Find a ride →
                </button>
                <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100">
                  Offer a ride
                </button>
              </div>

              <p className="mt-6 text-sm text-slate-500">
                Share the journey. Share the savings.
              </p>
            </div>

            <div className="rounded-3xl bg-emerald-900 p-8 text-white shadow-xl md:p-12">
              <div className="text-5xl">🚗</div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-emerald-300">
                The smarter way to travel
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-snug">
                Fewer cars. Better trips. Stronger connections.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-bold">Share</p>
                  <p className="mt-1 text-sm text-emerald-100">Travel costs</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-bold">Connect</p>
                  <p className="mt-1 text-sm text-emerald-100">With your community</p>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bg-white py-16">
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold">Carpooling made simple</h2>
                <p className="mt-3 text-slate-600">
                  Three easy steps to a better journey.
                </p>
              </div>

              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 p-6">
                  <div className="text-3xl">📍</div>
                  <h3 className="mt-4 text-xl font-bold">Choose your route</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Enter where you're going and find rides that fit your plans.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <div className="text-3xl">🤝</div>
                  <h3 className="mt-4 text-xl font-bold">Find your ride</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Connect with drivers and passengers travelling your way.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 p-6">
                  <div className="text-3xl">🌿</div>
                  <h3 className="mt-4 text-xl font-bold">Travel together</h3>
                  <p className="mt-2 leading-7 text-slate-600">
                    Share the cost and make the most of your journey.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="benefits" className="mx-auto max-w-6xl px-6 py-16 text-center">
            <h2 className="text-3xl font-bold">Good for your wallet. Better together.</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Carvo brings drivers and passengers together to make shared travel
              more convenient and affordable.
            </p>
          </section>
        </main>

        <footer className="border-t border-slate-200 bg-white py-6">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Carvo. Better journeys, together.
          </p>
        </footer>
      </div>
  )
}

export default App
