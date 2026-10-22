
import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Rides from './pages/Rides.jsx'
import RideDetails from './pages/RideDetails.jsx'
import BookingConfirmation from './pages/BookingConfirmation.jsx'
import OfferRide from './pages/OfferRide.jsx'
import MyRides from './pages/MyRides.jsx'
import Profile from './pages/Profile.jsx'
import Vehicles from './pages/Vehicles.jsx'
import Reviews from './pages/Reviews.jsx'
import Safety from './pages/Safety.jsx'
import RideRescue from './pages/RideRescue.jsx'

function Home() {
    const [distance, setDistance] = useState('100')
    const [mileage, setMileage] = useState('15')
    const [fuelPrice, setFuelPrice] = useState('100')
    const [passengers, setPassengers] = useState('4')
    const [calculated, setCalculated] = useState(false)

    const validInputs =
        distance.trim() !== '' &&
        mileage.trim() !== '' &&
        fuelPrice.trim() !== '' &&
        passengers.trim() !== '' &&
        Number(distance) > 0 &&
        Number(mileage) > 0 &&
        Number(fuelPrice) > 0 &&
        Number.isInteger(Number(passengers)) &&
        Number(passengers) >= 1

    const fuelCost = validInputs
        ? (Number(distance) / Number(mileage)) * Number(fuelPrice)
        : 0

    const costPerPerson = validInputs
        ? fuelCost / Number(passengers)
        : 0

    const money = (amount) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(amount)

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <Link to="/" className="text-2xl font-bold text-emerald-700">
                        carvo.
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
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

                        <Link
                            to="/profile"
                            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                        >
                            Profile
                        </Link>

                        <Link
                            to="/offer-ride"
                            className="rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-100"
                        >
                            Offer a Ride
                        </Link>

                        <Link
                            to="/vehicles"
                            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                        >
                            My Vehicles
                        </Link>

                        <Link
                            to="/reviews"
                            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                        >
                            Reviews
                        </Link>

                        <Link
                            to="/my-rides"
                            className="text-sm font-medium text-slate-700 hover:text-emerald-600"
                        >
                            My Rides
                        </Link>

                        {/* SOS button: opens the Ride Rescue page */}
                        <Link
                            to="/ride-rescue"
                            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                            aria-label="SOS: Open Ride Rescue"
                        >
                            🆘 SOS Help
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-16">
                {/* Homepage hero section */}
                <section className="py-8">
                    <p className="font-semibold text-emerald-700">
                        BETTER JOURNEYS, TOGETHER
                    </p>

                    <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-tight md:text-6xl">
                        Your journey.{' '}
                        <span className="text-emerald-700">Shared smarter.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                        Find people going your way, share the ride, and make every trip
                        more affordable with Carvo.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
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

                        <a
                            href="#fare-calculator"
                            className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-100"
                        >
                            Calculate fare ↓
                        </a>
                    </div>
                </section>


                {/* Homepage Ride Search */}
                <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6">
                        <p className="font-semibold text-emerald-700">
                            YOUR NEXT JOURNEY STARTS HERE
                        </p>
                        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                            Find your perfect ride
                        </h2>
                        <p className="mt-2 text-slate-600">
                            Choose your route and travel date to find people going your way.
                        </p>
                    </div>

                    <form
                        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
                        onSubmit={(event) => {
                            event.preventDefault()

                            const formData = new FormData(event.currentTarget)
                            const from = formData.get('from').trim()
                            const to = formData.get('to').trim()
                            const date = formData.get('date')

                            const params = new URLSearchParams({ from, to, date })
                            window.location.href = `/rides?${params.toString()}`
                        }}
                    >
                        <div>
                            <label htmlFor="ride-from" className="mb-2 block text-sm font-semibold">
                                From
                            </label>
                            <input
                                id="ride-from"
                                name="from"
                                type="text"
                                placeholder="Starting location"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="ride-to" className="mb-2 block text-sm font-semibold">
                                To
                            </label>
                            <input
                                id="ride-to"
                                name="to"
                                type="text"
                                placeholder="Your destination"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label htmlFor="ride-date" className="mb-2 block text-sm font-semibold">
                                Travel date
                            </label>
                            <input
                                id="ride-date"
                                name="date"
                                type="date"
                                min={new Date().toLocaleDateString('en-CA')}
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800"
                            >
                                Search rides →
                            </button>
                        </div>
                    </form>
                </section>


                {/* Fair Fare Calculator */}
                <section
                    id="fare-calculator"
                    className="mt-16 scroll-mt-8 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-10"
                >
                    <div className="max-w-2xl">
                        <p className="font-semibold uppercase tracking-wider text-emerald-700">
                            Share the cost
                        </p>

                        <h2 className="mt-2 text-3xl font-bold md:text-4xl">
                            Fair Fare Calculator
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            Estimate the fuel cost of your journey and see how much each
                            person would contribute when sharing the ride.
                        </p>
                    </div>

                    <form
                        className="mt-8 grid gap-6 md:grid-cols-2"
                        onSubmit={(event) => {
                            event.preventDefault()
                            setCalculated(true)
                        }}
                    >
                        <div>
                            <label
                                htmlFor="distance"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Journey distance (km)
                            </label>
                            <input
                                id="distance"
                                type="number"
                                min="0.1"
                                step="any"
                                required
                                value={distance}
                                onChange={(event) => {
                                    setDistance(event.target.value)
                                    setCalculated(false)
                                }}
                                placeholder="e.g. 100"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="mileage"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Vehicle mileage (km/litre)
                            </label>
                            <input
                                id="mileage"
                                type="number"
                                min="0.1"
                                step="any"
                                required
                                value={mileage}
                                onChange={(event) => {
                                    setMileage(event.target.value)
                                    setCalculated(false)
                                }}
                                placeholder="e.g. 15"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="fuelPrice"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Fuel price (₹ per litre)
                            </label>
                            <input
                                id="fuelPrice"
                                type="number"
                                min="0.01"
                                step="any"
                                required
                                value={fuelPrice}
                                onChange={(event) => {
                                    setFuelPrice(event.target.value)
                                    setCalculated(false)
                                }}
                                placeholder="e.g. 100"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="passengers"
                                className="mb-2 block text-sm font-semibold"
                            >
                                Number of people sharing
                            </label>
                            <input
                                id="passengers"
                                type="number"
                                min="1"
                                step="1"
                                required
                                value={passengers}
                                onChange={(event) => {
                                    setPassengers(event.target.value)
                                    setCalculated(false)
                                }}
                                placeholder="e.g. 4"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 sm:w-auto"
                            >
                                Calculate fair fare
                            </button>
                        </div>
                    </form>

                    {calculated && validInputs && (
                        <div
                            aria-live="polite"
                            className="mt-8 grid gap-4 sm:grid-cols-2"
                        >
                            <div className="rounded-2xl bg-slate-50 p-6">
                                <p className="text-sm font-medium text-slate-600">
                                    Estimated total fuel cost
                                </p>
                                <p className="mt-2 text-3xl font-bold text-slate-900">
                                    {money(fuelCost)}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-emerald-50 p-6">
                                <p className="text-sm font-medium text-emerald-800">
                                    Estimated cost per person
                                </p>
                                <p className="mt-2 text-3xl font-bold text-emerald-800">
                                    {money(costPerPerson)}
                                </p>
                            </div>

                            <p className="text-sm leading-6 text-slate-500 sm:col-span-2">
                                Estimate only: this calculation includes fuel cost, assumes
                                everyone shares it equally, and excludes tolls, parking,
                                maintenance, and other expenses.
                            </p>
                        </div>
                    )}

                    {calculated && !validInputs && (
                        <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                            Please enter positive values for distance, mileage and fuel
                            price, and a whole number of people (at least 1).
                        </p>
                    )}
                </section>

                {/* How it works */}
                <section
                    id="how-it-works"
                    className="mt-20 grid gap-6 md:grid-cols-3"
                >
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-3xl">📍</div>
                        <h2 className="mt-4 text-xl font-bold">Choose your route</h2>
                        <p className="mt-2 text-slate-600">
                            Enter your destination and travel plans.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-3xl">🤝</div>
                        <h2 className="mt-4 text-xl font-bold">Find your ride</h2>
                        <p className="mt-2 text-slate-600">
                            Connect with people travelling your way.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="text-3xl">🌿</div>
                        <h2 className="mt-4 text-xl font-bold">Travel together</h2>
                        <p className="mt-2 text-slate-600">
                            Share costs and make better journeys.
                        </p>
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
            <Route
                path="/booking-confirmation"
                element={<BookingConfirmation />}
            />
            <Route path="/offer-ride" element={<OfferRide />} />
            <Route path="/my-rides" element={<MyRides />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/ride-rescue" element={<RideRescue />} />
        </Routes>
    )
}

export default App
