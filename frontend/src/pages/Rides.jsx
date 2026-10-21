
import { useState } from 'react'
import { Link } from 'react-router-dom'

const sampleRides = [
    {
        id: 1,
        from: 'Chandigarh',
        to: 'Delhi',
        date: '2026-10-25',
        time: '8:00 AM',
        arrival: '11:00 AM',
        price: 350,
        seats: 2,
        driver: 'Aarav Sharma',
        rating: 4.8,
        label: 'Morning ride',
    },
    {
        id: 2,
        from: 'Rajpura',
        to: 'Ludhiana',
        date: '2026-10-26',
        time: '1:30 PM',
        arrival: '3:00 PM',
        price: 250,
        seats: 3,
        driver: 'Simran Kaur',
        rating: 4.9,
        label: 'Afternoon ride',
    },
    {
        id: 3,
        from: 'Delhi',
        to: 'Chandigarh',
        date: '2026-10-25',
        time: '9:00 AM',
        arrival: '12:30 PM',
        price: 400,
        seats: 2,
        driver: 'Kabir Singh',
        rating: 4.7,
        label: 'Morning ride',
    },
]

function Rides() {
    const [search, setSearch] = useState({
        from: '',
        to: '',
        date: '',
        passengers: '1',
    })

    const [hasSearched, setHasSearched] = useState(false)

    function handleSearch(event) {
        event.preventDefault()
        setHasSearched(true)
    }

    const filteredRides = sampleRides.filter((ride) => {
        const matchesFrom =
            !search.from.trim() ||
            ride.from.toLowerCase().includes(search.from.trim().toLowerCase())

        const matchesTo =
            !search.to.trim() ||
            ride.to.toLowerCase().includes(search.to.trim().toLowerCase())

        const matchesDate = !search.date || ride.date === search.date

        const matchesPassengers = ride.seats >= Number(search.passengers)

        return matchesFrom && matchesTo && matchesDate && matchesPassengers
    })

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link to="/" className="text-2xl font-bold text-emerald-700">
                        carvo.
                    </Link>

                    <Link
                        to="/"
                        className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
                    >
                        Back to home
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-14">
                <p className="font-semibold text-emerald-700">
                    YOUR NEXT JOURNEY STARTS HERE
                </p>

                <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
                    Find a ride.
                </h1>

                <p className="mt-4 max-w-xl text-slate-600">
                    Find people heading your way and make your journey more affordable.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="mt-10 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8"
                >
                    <div>
                        <label htmlFor="from" className="mb-2 block text-sm font-semibold">
                            Leaving from
                        </label>
                        <input
                            id="from"
                            name="from"
                            type="text"
                            placeholder="e.g. Chandigarh"
                            value={search.from}
                            onChange={(event) =>
                                setSearch({ ...search, from: event.target.value })
                            }
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="to" className="mb-2 block text-sm font-semibold">
                            Going to
                        </label>
                        <input
                            id="to"
                            name="to"
                            type="text"
                            placeholder="e.g. Delhi"
                            value={search.to}
                            onChange={(event) =>
                                setSearch({ ...search, to: event.target.value })
                            }
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="mb-2 block text-sm font-semibold">
                            Travel date
                        </label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            min={new Date().toLocaleDateString('en-CA')}
                            value={search.date}
                            onChange={(event) =>
                                setSearch({ ...search, date: event.target.value })
                            }
                            required
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
                            name="passengers"
                            value={search.passengers}
                            onChange={(event) =>
                                setSearch({ ...search, passengers: event.target.value })
                            }
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        >
                            <option value="1">1 passenger</option>
                            <option value="2">2 passengers</option>
                            <option value="3">3 passengers</option>
                            <option value="4">4 passengers</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 md:col-span-2"
                    >
                        Search rides →
                    </button>
                </form>

                <section className="mt-14">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="font-semibold text-emerald-700">EXPLORE CARVO</p>
                            <h2 className="mt-2 text-2xl font-bold">
                                {hasSearched ? 'Search results' : 'Example rides'}
                            </h2>
                            <p className="mt-2 text-slate-600">
                                {hasSearched
                                    ? `${filteredRides.length} matching demo ride${filteredRides.length === 1 ? '' : 's'} found`
                                    : 'Explore sample trips to see how Carvo works.'}
                            </p>
                        </div>

                        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
              Demo data
            </span>
                    </div>

                    {filteredRides.length > 0 ? (
                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            {filteredRides.map((ride) => (
                                <article
                                    key={ride.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                      {ride.label}
                    </span>
                                        <span className="text-xl font-bold text-emerald-700">
                      ₹{ride.price}
                    </span>
                                    </div>

                                    <div className="mt-6 flex gap-4">
                                        <div className="flex flex-col items-center pt-1">
                                            <span className="h-3 w-3 rounded-full border-2 border-emerald-700" />
                                            <span className="my-1 h-10 border-l-2 border-dashed border-slate-300" />
                                            <span className="h-3 w-3 rounded-full bg-emerald-700" />
                                        </div>

                                        <div className="flex-1 space-y-5">
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    FROM · {ride.time}
                                                </p>
                                                <h3 className="font-semibold">{ride.from}</h3>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    TO · {ride.arrival}
                                                </p>
                                                <h3 className="font-semibold">{ride.to}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-5 text-sm text-slate-500">
                                        Travel date: {ride.date}
                                    </p>

                                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                                        <div>
                                            <p className="font-semibold">{ride.driver}</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {ride.seats} seats available · Demo driver
                                            </p>
                                        </div>
                                        <span className="whitespace-nowrap text-sm text-slate-500">
                      ★ {ride.rating}
                    </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">
                            <div className="text-4xl">🔎</div>
                            <h3 className="mt-4 text-xl font-bold">No matching demo rides</h3>
                            <p className="mt-2 text-slate-600">
                                Try different cities, another date, or fewer passengers.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch({
                                        from: '',
                                        to: '',
                                        date: '',
                                        passengers: '1',
                                    })
                                    setHasSearched(false)
                                }}
                                className="mt-5 rounded-lg border border-slate-300 px-4 py-2 font-semibold hover:bg-slate-50"
                            >
                                Clear search
                            </button>
                        </div>
                    )}
                </section>

                <p className="mt-8 text-sm text-slate-500">
                    Shared journeys. Shared costs. Better travel.
                </p>
            </main>
        </div>
    )
}

export default Rides
