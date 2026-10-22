import { useState } from 'react'
import { Link } from 'react-router-dom'

function OfferRide() {
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: '',
    departure: '',
    seats: '3',
    price: '',
    vehicle: '',
    registration: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setSuccessMessage('')
    setErrorMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
      setErrorMessage('Starting point and destination must be different.')
      return
    }

    if (Number(form.price) <= 0) {
      setErrorMessage('Please enter a price greater than zero.')
      return
    }

    const ride = {
      ...form,
      id: `DEMO-${Date.now()}`,
      seats: Number(form.seats),
      price: Number(form.price),
      driver: 'You',
      status: 'Demo listing',
    }

    // Save this demo listing for the current browser session.
    const existingRides = JSON.parse(
      sessionStorage.getItem('carvo-offered-rides') || '[]',
    )

    sessionStorage.setItem(
      'carvo-offered-rides',
      JSON.stringify([...existingRides, ride]),
    )

    setSuccessMessage(
      'Your ride has been saved as a demo listing in this browser session. It has not been published to a real database.',
    )

    setForm({
      from: '',
      to: '',
      date: '',
      departure: '',
      seats: '3',
      price: '',
      vehicle: '',
      registration: '',
    })
  }

  const today = new Date().toLocaleDateString('en-CA')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-2xl font-bold text-emerald-700">
            carvo.
          </Link>

          <Link
            to="/rides"
            className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
          >
            Find a ride
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Heading */}
        <section>
          <p className="font-semibold text-emerald-700">
            DRIVE TOGETHER
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            Offer a ride
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Share your journey with fellow travellers, help split travel
            costs, and make better journeys together.
          </p>
        </section>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          {/* Route */}
          <section>
            <h2 className="text-xl font-bold">Journey details</h2>

            <p className="mt-1 text-sm text-slate-500">
              Where are you travelling?
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="from"
                  className="mb-2 block text-sm font-semibold"
                >
                  Starting point
                </label>

                <input
                  id="from"
                  name="from"
                  type="text"
                  required
                  maxLength={100}
                  value={form.from}
                  onChange={handleChange}
                  placeholder="e.g. Chandigarh"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="to"
                  className="mb-2 block text-sm font-semibold"
                >
                  Destination
                </label>

                <input
                  id="to"
                  name="to"
                  type="text"
                  required
                  maxLength={100}
                  value={form.to}
                  onChange={handleChange}
                  placeholder="e.g. Delhi"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Date and departure */}
          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold">Date and time</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold"
                >
                  Travel date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="departure"
                  className="mb-2 block text-sm font-semibold"
                >
                  Departure time
                </label>

                <input
                  id="departure"
                  name="departure"
                  type="time"
                  required
                  value={form.departure}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Seats and price */}
          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold">Seats and price</h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="seats"
                  className="mb-2 block text-sm font-semibold"
                >
                  Available passenger seats
                </label>

                <select
                  id="seats"
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="1">1 seat</option>
                  <option value="2">2 seats</option>
                  <option value="3">3 seats</option>
                  <option value="4">4 seats</option>
                  <option value="5">5 seats</option>
                  <option value="6">6 seats</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold"
                >
                  Price per passenger (₹)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  required
                  min="1"
                  max="100000"
                  step="1"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 350"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Vehicle details */}
          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-xl font-bold">Vehicle details</h2>

            <p className="mt-1 text-sm text-slate-500">
              Help passengers identify the vehicle.
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="vehicle"
                  className="mb-2 block text-sm font-semibold"
                >
                  Vehicle model
                </label>

                <input
                  id="vehicle"
                  name="vehicle"
                  type="text"
                  required
                  maxLength={100}
                  value={form.vehicle}
                  onChange={handleChange}
                  placeholder="e.g. Maruti Swift"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="registration"
                  className="mb-2 block text-sm font-semibold"
                >
                  Vehicle registration number
                </label>

                <input
                  id="registration"
                  name="registration"
                  type="text"
                  required
                  maxLength={20}
                  value={form.registration}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 uppercase outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>
          </section>

          {/* Messages */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <div
              role="status"
              className="rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
            >
              {successMessage}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Publish demo ride
            </button>

            <Link
              to="/rides"
              className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>

          <p className="text-xs leading-5 text-slate-500">
            Demo only: this listing is saved in this browser session. It is
            not published to other users or saved to the backend.
          </p>
        </form>
      </main>
    </div>
  )
}

export default OfferRide
