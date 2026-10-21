
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialVehicles = [
    {
        id: 1,
        name: 'Hyundai i20',
        type: 'Hatchback',
        registration: 'PB-XX-1234',
        seats: 3,
    },
]

export default function Vehicles() {
    const [vehicles, setVehicles] = useState(initialVehicles)
    const [showForm, setShowForm] = useState(false)
    const [message, setMessage] = useState('')
    const [form, setForm] = useState({
        name: '',
        type: 'Hatchback',
        registration: '',
        seats: '3',
    })

    function handleChange(event) {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
        setMessage('')
    }

    function handleSubmit(event) {
        event.preventDefault()

        const vehicle = {
            ...form,
            id: Date.now(),
            seats: Number(form.seats),
            registration: form.registration.trim().toUpperCase(),
        }

        if (
            vehicles.some(
                (item) =>
                    item.registration.toLowerCase() ===
                    vehicle.registration.toLowerCase(),
            )
        ) {
            setMessage('A vehicle with this registration already exists.')
            return
        }

        setVehicles((current) => [...current, vehicle])
        setForm({
            name: '',
            type: 'Hatchback',
            registration: '',
            seats: '3',
        })
        setShowForm(false)
        setMessage('Vehicle added successfully for this demo.')
    }

    function removeVehicle(id) {
        setVehicles((current) => current.filter((vehicle) => vehicle.id !== id))
        setMessage('Vehicle removed from this demo.')
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-emerald-700">
                        carvo.
                    </Link>

                    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
                        <Link to="/rides" className="text-slate-600 hover:text-emerald-700">
                            Find a ride
                        </Link>
                        <Link to="/offer-ride" className="text-slate-600 hover:text-emerald-700">
                            Offer a Ride
                        </Link>
                        <Link to="/my-rides" className="text-slate-600 hover:text-emerald-700">
                            My Rides
                        </Link>
                        <Link to="/profile" className="text-slate-600 hover:text-emerald-700">
                            Profile
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <Link to="/" className="text-sm font-medium text-emerald-700 hover:underline">
                    ← Back to home
                </Link>

                <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                            Driver settings
                        </p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            My vehicles
                        </h1>
                        <p className="mt-3 text-slate-600">
                            Manage the vehicles you plan to use for Carvo rides.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setShowForm((current) => !current)
                            setMessage('')
                        }}
                        className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                    >
                        {showForm ? 'Cancel' : '+ Add vehicle'}
                    </button>
                </div>

                {message && (
                    <p role="status" className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                        {message}
                    </p>
                )}

                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
                    >
                        <h2 className="text-xl font-bold">Vehicle details</h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Vehicle make and model
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Hyundai i20"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="mb-2 block text-sm font-medium">
                                    Vehicle type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                                >
                                    <option>Hatchback</option>
                                    <option>Sedan</option>
                                    <option>SUV</option>
                                    <option>MPV</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="registration" className="mb-2 block text-sm font-medium">
                                    Registration number
                                </label>
                                <input
                                    id="registration"
                                    name="registration"
                                    value={form.registration}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. PB-XX-1234"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="seats" className="mb-2 block text-sm font-medium">
                                    Passenger seats available
                                </label>
                                <select
                                    id="seats"
                                    name="seats"
                                    value={form.seats}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                                >
                                    <option value="1">1 seat</option>
                                    <option value="2">2 seats</option>
                                    <option value="3">3 seats</option>
                                    <option value="4">4 seats</option>
                                    <option value="5">5 seats</option>
                                    <option value="6">6 seats</option>
                                    <option value="7">7 seats</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                        >
                            Save vehicle
                        </button>
                    </form>
                )}

                <section className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold">Saved vehicles</h2>
                        <span className="text-sm text-slate-500">
              {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'}
            </span>
                    </div>

                    {vehicles.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                            <h3 className="font-semibold">No vehicles added yet</h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Add a vehicle to start managing your ride options.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {vehicles.map((vehicle) => (
                                <article
                                    key={vehicle.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-6"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                                            🚗
                                        </div>
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                      Demo vehicle
                    </span>
                                    </div>

                                    <h3 className="mt-4 text-lg font-bold">{vehicle.name}</h3>
                                    <p className="mt-1 text-sm text-slate-500">{vehicle.type}</p>

                                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
                                        <p className="flex justify-between gap-3">
                                            <span className="text-slate-500">Registration</span>
                                            <span className="font-semibold">{vehicle.registration}</span>
                                        </p>
                                        <p className="flex justify-between gap-3">
                                            <span className="text-slate-500">Passenger seats</span>
                                            <span className="font-semibold">{vehicle.seats}</span>
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeVehicle(vehicle.id)}
                                        className="mt-5 text-sm font-semibold text-red-600 hover:text-red-700"
                                    >
                                        Remove vehicle
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <p className="mt-8 text-sm text-slate-500">
                    Demo only: vehicles are kept in page memory and are not saved to a database.
                </p>
            </main>
        </div>
    )
}
