import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

function Rides() {
    const [searchParams] = useSearchParams()

    const [rides, setRides] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [sortOrder, setSortOrder] = useState('default')

    const [search, setSearch] = useState(() => ({
        from: searchParams.get('from') || '',
        to: searchParams.get('to') || '',
        date: searchParams.get('date') || '',
        passengers: '1',
    }))

    const [hasSearched, setHasSearched] = useState(() =>
        Boolean(
            searchParams.get('from') ||
            searchParams.get('to') ||
            searchParams.get('date')
        )
    )

    // Fetch available rides from the backend
    useEffect(() => {
        async function fetchRides() {
            try {
                const token = localStorage.getItem('carvoToken')

                if (!token) {
                    throw new Error(
                        'Please log in to view available rides.'
                    )
                }

                const response = await fetch(
                    'http://localhost:8080/api/rides',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Failed to fetch rides.'
                    )
                }

                const formattedRides = data.map((ride) => ({
                    ...ride,
                    from: ride.origin,
                    to: ride.destination,
                    date: ride.departureTime.slice(0, 10),
                    departure: new Date(
                        ride.departureTime
                    ).toLocaleTimeString('en-IN', {
                        hour: 'numeric',
                        minute: '2-digit',
                    }),
                    arrival: 'Not specified',
                    price: Number(ride.pricePerSeat),
                    seats: ride.availableSeats,
                    driver: ride.driverName,
                    car: 'Vehicle details unavailable',
                }))

                setRides(formattedRides)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchRides()
    }, [])

    // Filter rides
    const filteredRides = rides.filter((ride) => {
        const matchesFrom = ride.from
            .toLowerCase()
            .includes(search.from.trim().toLowerCase())

        const matchesTo = ride.to
            .toLowerCase()
            .includes(search.to.trim().toLowerCase())

        const matchesDate = !search.date || ride.date === search.date

        const matchesPassengers =
            ride.seats >= Number(search.passengers)

        return (
            matchesFrom &&
            matchesTo &&
            matchesDate &&
            matchesPassengers
        )
    })

    // Sort rides
    const sortedRides = [...filteredRides].sort((a, b) => {
        if (sortOrder === 'price-low') {
            return a.price - b.price
        }

        if (sortOrder === 'price-high') {
            return b.price - a.price
        }

        return 0
    })

    // Search handler
    function handleSearch(event) {
        event.preventDefault()
        setHasSearched(true)
    }

    // Clear search filters
    function handleClearSearch() {
        setSearch({
            from: '',
            to: '',
            date: '',
            passengers: '1',
        })
        setHasSearched(false)
        setSortOrder('default')
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-emerald-700"
                    >
                        carvo.
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="hidden rounded-lg px-4 py-2 text-sm font-semibold hover:bg-slate-100 sm:block"
                        >
                            Home
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

            <main className="mx-auto max-w-6xl px-6 py-12">
                {/* Page heading */}
                <section>
                    <p className="font-semibold text-emerald-700">
                        FIND YOUR NEXT JOURNEY
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                        Find a ride
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                        Search available rides, compare prices, and find
                        people travelling your way.
                    </p>
                </section>

                {/* Search form */}
                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <form onSubmit={handleSearch}>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label
                                    htmlFor="from"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    From
                                </label>
                                <input
                                    id="from"
                                    type="text"
                                    placeholder="Leaving from"
                                    value={search.from}
                                    onChange={(event) =>
                                        setSearch({
                                            ...search,
                                            from: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="to"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    To
                                </label>
                                <input
                                    id="to"
                                    type="text"
                                    placeholder="Going to"
                                    value={search.to}
                                    onChange={(event) =>
                                        setSearch({
                                            ...search,
                                            to: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="date"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Travel date
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    value={search.date}
                                    onChange={(event) =>
                                        setSearch({
                                            ...search,
                                            date: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="passengers"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Passengers
                                </label>
                                <select
                                    id="passengers"
                                    value={search.passengers}
                                    onChange={(event) =>
                                        setSearch({
                                            ...search,
                                            passengers: event.target.value,
                                        })
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="1">1 passenger</option>
                                    <option value="2">2 passengers</option>
                                    <option value="3">3 passengers</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="submit"
                                className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
                            >
                                Search rides
                            </button>

                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-50"
                            >
                                Clear filters
                            </button>
                        </div>
                    </form>
                </section>

                {/* Search results */}
                <section className="mt-12">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {hasSearched
                                    ? 'Search results'
                                    : 'Available rides'}
                            </h2>

                            <p className="mt-2 text-slate-600">
                                {loading
                                    ? 'Fetching rides...'
                                    : error
                                        ? 'Unable to load rides'
                                        : `${filteredRides.length} ${
                                            filteredRides.length === 1
                                                ? 'ride'
                                                : 'rides'
                                        } found`}
                            </p>
                        </div>

                        <p className="text-sm text-slate-500">
                            Live ride listings
                        </p>
                    </div>

                    {/* Sorting options */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        <label
                            htmlFor="sort-price"
                            className="text-sm font-semibold"
                        >
                            Sort rides:
                        </label>

                        <select
                            id="sort-price"
                            value={sortOrder}
                            onChange={(event) =>
                                setSortOrder(event.target.value)
                            }
                            className="rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        >
                            <option value="default">Default order</option>
                            <option value="price-low">
                                Price: Low to High
                            </option>
                            <option value="price-high">
                                Price: High to Low
                            </option>
                        </select>
                    </div>

                    {/* Loading state */}
                    {loading ? (
                        <p className="mt-8 text-center text-slate-600">
                            Loading available rides...
                        </p>
                    ) : error ? (

                        /* Error state */
                        <div
                            role="alert"
                            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-700"
                        >
                            {error}
                        </div>

                    ) : sortedRides.length > 0 ? (

                        /* Ride cards */
                        <div className="mt-6 grid gap-5">
                            {sortedRides.map((ride) => (
                                <article
                                    key={ride.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md md:p-8"
                                >
                                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="text-sm text-slate-500">
                                                    Driver: {ride.driver}
                                                </span>
                                            </div>

                                            <div className="mt-6 flex items-start gap-4">
                                                <div className="flex flex-col items-center pt-1">
                                                    <span className="h-3 w-3 rounded-full border-2 border-emerald-700" />
                                                    <span className="my-2 h-10 border-l-2 border-dashed border-slate-300" />
                                                    <span className="h-3 w-3 rounded-full bg-emerald-700" />
                                                </div>

                                                <div className="flex-1 space-y-5">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div>
                                                            <h3 className="text-lg font-bold">
                                                                {ride.from}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-slate-500">
                                                                Departure
                                                            </p>
                                                        </div>

                                                        <p className="font-semibold text-slate-700">
                                                            {ride.departure}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <div>
                                                            <h3 className="text-lg font-bold">
                                                                {ride.to}
                                                            </h3>

                                                            <p className="mt-1 text-sm text-slate-500">
                                                                Arrival
                                                            </p>
                                                        </div>

                                                        <p className="font-semibold text-slate-700">
                                                            {ride.arrival}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                                                <span>
                                                    📅{' '}
                                                    {new Date(
                                                        `${ride.date}T00:00:00`
                                                    ).toLocaleDateString(
                                                        'en-IN',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </span>

                                                <span>
                                                    💺 {ride.seats} seats available
                                                </span>

                                            </div>
                                        </div>

                                        {/* Price and details */}
                                        <div className="flex min-w-44 flex-col items-start justify-between border-t border-slate-100 pt-5 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Price per seat
                                                </p>

                                                <p className="mt-1 text-3xl font-extrabold text-emerald-700">
                                                    ₹{ride.price}
                                                </p>
                                            </div>

                                            <Link
                                                to="/ride-details"
                                                state={{ ride }}
                                                className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-3 text-center font-semibold text-white hover:bg-emerald-800"
                                            >
                                                View details →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* Empty state */
                        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <div className="text-4xl">🚗</div>

                            <h3 className="mt-4 text-xl font-bold">
                                No rides found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-slate-600">
                                No rides match your search. Try a different
                                location, date, or passenger count.
                            </p>

                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="mt-6 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© 2026 Carvo. Better journeys, together.</p>

                    <Link
                        to="/"
                        className="font-semibold hover:text-emerald-700"
                    >
                        Back to home
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default Rides
