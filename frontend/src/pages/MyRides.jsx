import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:8080/api'

const statusStyles = {
  Upcoming: 'bg-emerald-50 text-emerald-800',
  Completed: 'bg-sky-50 text-sky-800',
  Cancelled: 'bg-red-50 text-red-800',
}

function getJourneyStatus(departureTime, bookingStatus) {
  if (bookingStatus?.toUpperCase() === 'CANCELLED') {
    return 'Cancelled'
  }

  if (departureTime && new Date(departureTime) < new Date()) {
    return 'Completed'
  }

  return 'Upcoming'
}

function formatDate(dateTime) {
  if (!dateTime) return 'Not available'

  return new Date(dateTime).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateTime) {
  if (!dateTime) return 'Not available'

  return new Date(dateTime).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function MyRides() {
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState('bookings')
  const [activeStatus, setActiveStatus] = useState('All')

  const [bookings, setBookings] = useState([])
  const [offeredRides, setOfferedRides] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [cancellingId, setCancellingId] = useState(null)

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      const token = localStorage.getItem('carvoToken')

      if (!token) {
        navigate('/login')
        return
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const [bookingResponse, rideResponse] = await Promise.all([
        fetch(`${API_URL}/bookings/my-bookings`, { headers }),
        fetch(`${API_URL}/rides/my-rides`, { headers }),
      ])

      const bookingData = await bookingResponse.json()
      const rideData = await rideResponse.json()

      if (!bookingResponse.ok) {
        throw new Error(
          bookingData.message || 'Unable to load your bookings.'
        )
      }

      if (!rideResponse.ok) {
        throw new Error(
          rideData.message || 'Unable to load your offered rides.'
        )
      }

      const formattedBookings = bookingData.map((booking) => ({
        id: booking.bookingId,
        from: booking.origin,
        to: booking.destination,
        dateTime: booking.departureTime,
        departure: formatTime(booking.departureTime),
        date: formatDate(booking.departureTime),
        driver: booking.driverName,
        price: Number(booking.pricePerSeat || 0),
        seats: booking.seatsBooked,
        status: getJourneyStatus(
          booking.departureTime,
          booking.status
        ),
        bookingStatus: booking.status,
      }))

      const formattedRides = rideData.map((ride) => ({
        id: ride.id,
        from: ride.origin,
        to: ride.destination,
        dateTime: ride.departureTime,
        departure: formatTime(ride.departureTime),
        date: formatDate(ride.departureTime),
        price: Number(ride.pricePerSeat || 0),
        seats: ride.availableSeats,
        status: getJourneyStatus(ride.departureTime),
      }))

      setBookings(formattedBookings)
      setOfferedRides(formattedRides)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    )

    if (!confirmed) return

    try {
      setCancellingId(bookingId)
      setError('')
      setSuccessMessage('')

      const token = localStorage.getItem('carvoToken')

      const response = await fetch(
        `${API_URL}/bookings/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to cancel this booking.'
        )
      }

      setSuccessMessage('Booking cancelled successfully!')
      await fetchDashboardData()
    } catch (err) {
      setError(err.message || 'Cancellation failed.')
    } finally {
      setCancellingId(null)
    }
  }

  const allRides =
    activeSection === 'offered' ? offeredRides : bookings

  const visibleRides =
    activeStatus === 'All'
      ? allRides
      : allRides.filter((ride) => ride.status === activeStatus)

  const upcomingCount = allRides.filter(
    (ride) => ride.status === 'Upcoming'
  ).length

  const completedCount = allRides.filter(
    (ride) => ride.status === 'Completed'
  ).length

  const cancelledCount = allRides.filter(
    (ride) => ride.status === 'Cancelled'
  ).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading your journeys...</p>
      </div>
    )
  }

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

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
            <button
              onClick={fetchDashboardData}
              className="ml-3 font-semibold underline"
            >
              Try again
            </button>
          </div>
        )}

        {successMessage && (
          <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
            {successMessage}
          </div>
        )}

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

        <section className="mt-10">
          <div className="flex flex-wrap gap-2 border-b border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveSection('bookings')
                setActiveStatus('All')
                setSuccessMessage('')
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
                setSuccessMessage('')
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
              )
            )}
          </div>

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
                        <span>📅 {ride.date}</span>
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
                          ₹{ride.price.toFixed(2)}
                        </p>
                      </div>

                      {activeSection === 'bookings' &&
                        ride.bookingStatus === 'CONFIRMED' && (
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(ride.id)}
                            disabled={cancellingId === ride.id}
                            className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            {cancellingId === ride.id
                              ? 'Cancelling...'
                              : 'Cancel Booking'}
                          </button>
                        )}

                      {activeSection === 'offered' &&
                        ride.status === 'Upcoming' && (
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
      </main>
    </div>
  )
}

export default MyRides