import { useState } from 'react'
import { Link } from 'react-router-dom'

const demoOfferedRides = [
  {
    id: 'OFFER-101',
    from: 'Chandigarh',
    to: 'Delhi',
    date: '2026-10-25',
    departure: '8:00 AM',
    price: 350,
    seats: 2,
    status: 'Upcoming',
  },
  {
    id: 'OFFER-102',
    from: 'Rajpura',
    to: 'Ludhiana',
    date: '2026-10-18',
    departure: '1:30 PM',
    price: 250,
    seats: 3,
    status: 'Completed',
  },
  {
    id: 'OFFER-103',
    from: 'Delhi',
    to: 'Chandigarh',
    date: '2026-10-28',
    departure: '9:00 AM',
    price: 400,
    seats: 2,
    status: 'Cancelled',
  },
]

const demoBookings = [
  {
    id: 'BOOK-201',
    from: 'Chandigarh',
    to: 'Delhi',
    date: '2026-10-25',
    departure: '8:00 AM',
    driver: 'Aarav Sharma',
    price: 350,
    seats: 1,
    status: 'Upcoming',
  },
  {
    id: 'BOOK-202',
    from: 'Rajpura',
    to: 'Ludhiana',
    date: '2026-10-18',
    departure: '1:30 PM',
    driver: 'Simran Kaur',
    price: 250,
    seats: 2,
    status: 'Completed',
  },
  {
    id: 'BOOK-203',
    from: 'Delhi',
    to: 'Chandigarh',
    date: '2026-10-28',
    departure: '9:00 AM',
    driver: 'Kabir Singh',
    price: 400,
    seats: 1,
    status: 'Cancelled',
  },
]

const statusStyles = {
  Upcoming: 'bg-emerald-50 text-emerald-800',
  Completed: 'bg-sky-50 text-sky-800',
  Cancelled: 'bg-red-50 text-red-800',
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function MyRides() {
  const [activeSection, setActiveSection] = useState('bookings')
  const [activeStatus, setActiveStatus] = useState('All')

  // Load offered demo rides saved by the Offer a Ride form.
  const [offeredRides] = useState(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem('carvo-offered-rides') || '[]',
      )

      return [
        ...saved.map((ride) => ({
          ...ride,
          status: 'Upcoming',
        })),
        ...demoOfferedRides,
      ]
    } catch {
      return demoOfferedRides
    }
  })

  const allRides =
    activeSection === 'offered' ? offeredRides : demoBookings

  const visibleRides =
    activeStatus === 'All'
      ? allRides
      : allRides.filter((ride) => ride.status === activeStatus)

  const upcomingCount = allRides.filter(
    (ride) => ride.status === 'Upcoming',
  ).length

  const completedCount = allRides.filter(
    (ride) => ride.status === 'Completed',
  ).length

  const cancelledCount = allRides.filter(
    (ride) => ride.status === 'Cancelled',
  ).length

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-2xl font-bold text-emerald-700">
            carvo.
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/rides"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-100 sm:block"
            >
              Find a ride
            </Link>

            <Link
              to="/offer-ride"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Offer a ride
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Page heading */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-emerald-700">
              YOUR JOURNEYS
            </p>

            <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
              My Rides
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Keep track of the rides you offer and the journeys you book.
            </p>
          </div>

          <Link
            to="/offer-ride"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            + Offer a ride
          </Link>
        </section>

        {/* Summary cards */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Upcoming</p>
            <p className="mt-2 text-3xl font-extrabold">
              {upcomingCount}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Journeys ahead
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-extrabold">
              {completedCount}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Journeys finished
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Cancelled</p>
            <p className="mt-2 text-3xl font-extrabold">
              {cancelledCount}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Cancelled journeys
            </p>
          </div>
        </section>

        {/* Switch between bookings and offered rides */}
        <section className="mt-10">
          <div className="flex flex-wrap gap-2 border-b border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveSection('bookings')
                setActiveStatus('All')
              }}
              className={`border-b-2 px-4 py-3 text-sm font-semibold ${
    activeSection === 'bookings'
        ? 'border-emerald-700 text-emerald-800'
        : 'border-transparent text-slate-500 hover:text-slate-900'
}`}
            >
              My Bookings
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSection('offered')
                setActiveStatus('All')
              }}
              className={`border-b-2 px-4 py-3 text-sm font-semibold ${
    activeSection === 'offered'
        ? 'border-emerald-700 text-emerald-800'
        : 'border-transparent text-slate-500 hover:text-slate-900'
}`}
            >
              My Offered Rides
            </button>
          </div>

          {/* Status filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['All', 'Upcoming', 'Completed', 'Cancelled'].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
    activeStatus === status
        ? 'bg-emerald-700 text-white'
        : 'border border-slate-300 bg-white text-slate-600 hover:bg-slate-100'
}`}
                >
                  {status}
                </button>
              ),
            )}
          </div>

          {/* Ride list */}
          <div className="mt-6 space-y-4">
            {visibleRides.length > 0 ? (
              visibleRides.map((ride) => (
                <article
                  key={ride.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
    statusStyles[ride.status] ||
    'bg-slate-100 text-slate-700'
}`}
                        >
                          {ride.status}
                        </span>

                        <span className="text-xs text-slate-500">
                          Ref: {ride.id}
                        </span>
                      </div>

                      <h2 className="mt-4 text-xl font-bold">
                        {ride.from} <span className="text-emerald-700">→</span>{' '}
                        {ride.to}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                        <span>📅 {formatDate(ride.date)}</span>
                        <span>🕒 {ride.departure}</span>
                        <span>
                          💺 {ride.seats}{' '}
                          {ride.seats === 1 ? 'seat' : 'seats'}
                        </span>
                      </div>

                      {activeSection === 'bookings' && ride.driver && (
                        <p className="mt-3 text-sm text-slate-500">
                          Driver: {ride.driver}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4 md:min-w-40 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
                      <div>
                        <p className="text-xs text-slate-500">
                          {activeSection === 'bookings'
                            ? 'Price per seat'
                            : 'Price per passenger'}
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                          ₹{ride.price}
                        </p>
                      </div>

                      {ride.status === 'Upcoming' && (
                        <Link
                          to="/rides"
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                        >
                          Find rides
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                <div className="text-4xl">🚗</div>

                <h2 className="mt-4 text-xl font-bold">
                  No rides in this category
                </h2>

                <p className="mt-2 text-slate-600">
                  Try another status filter or explore more rides.
                </p>

                <Link
                  to={activeSection === 'offered' ? '/offer-ride' : '/rides'}
                  className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                >
                  {activeSection === 'offered'
                    ? 'Offer a ride'
                    : 'Find a ride'}
                </Link>
              </div>
            )}
          </div>
        </section>

        <p className="mt-8 text-xs leading-5 text-slate-500">
          Demo dashboard: sample bookings and offered rides are displayed
          locally. This is not a live account dashboard, and statuses do not
          represent real booking records.
        </p>
      </main>
    </div>
  )
}

export default MyRides
