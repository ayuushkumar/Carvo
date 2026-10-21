import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function RideDetails() {
  const location = useLocation()
  const navigate = useNavigate()

  // Get the ride selected on the rides page.
  const selectedRide = location.state?.ride

  const ride = selectedRide
    ? {
        ...selectedRide,
        availableSeats:
          selectedRide.seats ?? selectedRide.availableSeats ?? 0,
        car: selectedRide.car ?? 'Comfortable 4-seater car',
      }
    : null

  const [seats, setSeats] = useState('1')

  function handleBooking() {
    if (!ride) return

    navigate('/booking-confirmation', {
      state: {
        booking: {
          ride,
          seats: Number(seats),
          total: ride.price * Number(seats),
        },
      },
    })
  }

  // Show this if someone opens the page without selecting a ride.
  if (!ride) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link to="/" className="text-2xl font-bold text-emerald-700">
              carvo.
            </Link>

            <Link
              to="/rides"
              className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
            >
              ← Back to rides
            </Link>
          </nav>
        </header>

        <main className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="text-5xl">🚗</div>

          <h1 className="mt-5 text-3xl font-extrabold">
            No ride selected
          </h1>

          <p className="mt-3 text-slate-600">
            Please return to the rides page and select a ride to view its
            details.
          </p>

          <Link
            to="/rides"
            className="mt-7 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            Browse rides
          </Link>
        </main>
      </div>
    )
  }

  const formattedDate = new Date(
    `${ride.date}T00:00:00`,
  ).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

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
            ← Back to rides
          </Link>
        </nav>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-3">
        {/* Ride information */}
        <section className="space-y-6 lg:col-span-2">
          <div>
            <p className="font-semibold text-emerald-700">
              RIDE DETAILS
            </p>

            <h1 className="mt-3 text-4xl font-extrabold">
              {ride.from} to {ride.to}
            </h1>

            <p className="mt-3 text-slate-600">
              Review your journey before requesting a demo booking.
            </p>
          </div>

          {/* Route card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center pt-1">
                <span className="h-3 w-3 rounded-full border-2 border-emerald-700" />
                <span className="my-2 h-16 border-l-2 border-dashed border-slate-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-700" />
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <p className="text-sm text-slate-500">
                    {ride.departure}
                  </p>

                  <h2 className="mt-1 text-xl font-bold">{ride.from}</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Departure point
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">{ride.arrival}</p>

                  <h2 className="mt-1 text-xl font-bold">{ride.to}</h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Arrival point
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Travel date</p>
                <p className="mt-1 font-semibold">{formattedDate}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Vehicle</p>
                <p className="mt-1 font-semibold">{ride.car}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Available seats</p>
                <p className="mt-1 font-semibold">
                  {ride.availableSeats} seats
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Departure time</p>
                <p className="mt-1 font-semibold">{ride.departure}</p>
              </div>
            </div>
          </div>

          {/* Driver information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              YOUR DRIVER
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-800">
                {ride.driver
                  .split(' ')
                  .map((part) => part[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-bold">{ride.driver}</h2>

                <p className="mt-1 text-sm text-slate-500">
                  ★ {ride.rating} · Example driver profile
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking panel */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Price per seat</p>

          <p className="mt-1 text-3xl font-extrabold text-emerald-700">
            ₹{ride.price}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Demo price only
          </p>

          <div className="mt-6">
            <label
              htmlFor="seats"
              className="mb-2 block text-sm font-semibold"
            >
              Number of seats
            </label>

            <select
              id="seats"
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            >
              {Array.from(
                { length: ride.availableSeats },
                (_, index) => index + 1,
              ).map((count) => (
                <option key={count} value={String(count)}>
                  {count} {count === 1 ? 'seat' : 'seats'}
                </option>
              ))}
            </select>
          </div>

          {/* Automatically calculated total */}
          <div className="mt-5 flex justify-between border-t border-slate-100 pt-5">
            <span className="text-slate-600">Total</span>

            <span className="text-xl font-bold">
              ₹{ride.price * Number(seats)}
            </span>
          </div>

          {/* Navigate to confirmation page */}
          <button
            type="button"
            onClick={handleBooking}
            disabled={ride.availableSeats < 1}
            className="mt-6 w-full rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Book this ride
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Demo only. No payment is processed and no real reservation is
            made.
          </p>

          <button
            type="button"
            onClick={() => navigate('/rides')}
            className="mt-3 w-full rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
          >
            Browse other rides
          </button>
        </aside>
      </main>
    </div>
  )
}

export default RideDetails
