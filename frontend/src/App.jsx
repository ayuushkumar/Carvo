
import { Link, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Rides from './pages/Rides.jsx'
import RideDetails from './pages/RideDetails.jsx'

function Home() {
  return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link to="/" className="text-2xl font-bold text-emerald-700">
              carvo.
            </Link>

            <div className="flex items-center gap-3">
              <Link
                  to="/rides"
                  className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
              >
                Find a ride →
              </Link>
              <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                  to="/signup"
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-semibold text-emerald-700">
            BETTER JOURNEYS, TOGETHER
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight md:text-6xl">
            Your journey. <span className="text-emerald-700">Shared smarter.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Find people going your way, share the ride, and make every trip
            more affordable with Carvo.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
                to="/signup"
                className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Get started →
            </Link>
            <a
                href="#how-it-works"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold hover:bg-slate-100"
            >
              How it works
            </a>
          </div>

          <section id="how-it-works" className="mt-20 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl">📍</div>
              <h2 className="mt-4 text-xl font-bold">Choose your route</h2>
              <p className="mt-2 text-slate-600">Enter your destination and travel plans.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl">🤝</div>
              <h2 className="mt-4 text-xl font-bold">Find your ride</h2>
              <p className="mt-2 text-slate-600">Connect with people travelling your way.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-3xl">🌿</div>
              <h2 className="mt-4 text-xl font-bold">Travel together</h2>
              <p className="mt-2 text-slate-600">Share costs and make better journeys.</p>
            </div>
          </section>
        </main>
      </div>
  )
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/rides" element={<Rides />} />
        <Route path="/ride-details" element={<RideDetails />} />
      </Routes>
  )
}

export default App
