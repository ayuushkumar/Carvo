
import { useState } from 'react'
import { Link } from 'react-router-dom'

const issueTypes = [
    'Driver behaviour concern',
    'Passenger behaviour concern',
    'Vehicle problem',
    'Trip delay or route concern',
    'Pickup or drop-off problem',
    'Other',
]

export default function RideRescue() {
    const [issueType, setIssueType] = useState(issueTypes[0])
    const [rideReference, setRideReference] = useState('')
    const [description, setDescription] = useState('')
    const [urgency, setUrgency] = useState('normal')
    const [message, setMessage] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        const report = {
            id: `RES-${Date.now()}`,
            issueType,
            rideReference: rideReference.trim(),
            description: description.trim(),
            urgency,
            createdAt: new Date().toISOString(),
        }

        const existingReports = JSON.parse(
            sessionStorage.getItem('carvo-rescue-reports') || '[]',
        )

        sessionStorage.setItem(
            'carvo-rescue-reports',
            JSON.stringify([report, ...existingReports]),
        )

        setMessage(
            `Demo report ${report.id} saved in this browser session. It has not been sent to a support team.`,
        )
        setRideReference('')
        setDescription('')
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-emerald-700">
                        carvo.
                    </Link>

                    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
                        <Link to="/rides" className="text-slate-600 hover:text-emerald-700">
                            Find a ride
                        </Link>
                        <Link to="/my-rides" className="text-slate-600 hover:text-emerald-700">
                            My Rides
                        </Link>
                        <Link to="/safety" className="text-slate-600 hover:text-emerald-700">
                            Safety Centre
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <Link to="/" className="text-sm font-medium text-emerald-700 hover:underline">
                    ← Back to home
                </Link>

                <section className="mt-6 rounded-3xl bg-emerald-900 p-8 text-white sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
                        Help during your journey
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                        Ride Rescue
                    </h1>
                    <p className="mt-4 max-w-2xl leading-7 text-emerald-50">
                        Record a ride concern and find guidance on what to do next.
                    </p>
                </section>

                <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
                    <h2 className="text-xl font-bold text-red-900">
                        Are you in immediate danger?
                    </h2>
                    <p className="mt-2 leading-7 text-red-900">
                        Move to a safe place if possible. In India, call 112 for emergency
                        assistance when needed.
                    </p>
                    <a
                        href="tel:112"
                        className="mt-4 inline-flex rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
                    >
                        Call emergency number 112
                    </a>
                    <p className="mt-3 text-sm text-red-800">
                        This link opens your phone dialler on compatible devices. Do not wait
                        for this demo form if you need urgent help.
                    </p>
                </section>

                <section className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
                    >
                        <h2 className="text-xl font-bold">Report a ride concern</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Complete this form to test the demo reporting flow.
                        </p>

                        <div className="mt-6 space-y-5">
                            <div>
                                <label htmlFor="issueType" className="mb-2 block text-sm font-medium">
                                    Type of issue
                                </label>
                                <select
                                    id="issueType"
                                    value={issueType}
                                    onChange={(event) => setIssueType(event.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
                                >
                                    {issueTypes.map((issue) => (
                                        <option key={issue} value={issue}>
                                            {issue}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="rideReference" className="mb-2 block text-sm font-medium">
                                    Ride reference (optional)
                                </label>
                                <input
                                    id="rideReference"
                                    value={rideReference}
                                    onChange={(event) => setRideReference(event.target.value)}
                                    maxLength={100}
                                    placeholder="Enter your ride or booking reference"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>

                            <fieldset>
                                <legend className="mb-2 block text-sm font-medium">
                                    How urgent is this issue?
                                </legend>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { value: 'normal', label: 'Non-urgent' },
                                        { value: 'high', label: 'Needs attention' },
                                    ].map((option) => (
                                        <label
                                            key={option.value}
                                            className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium ${
                                                urgency === option.value
                                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                                                    : 'border-slate-200'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="urgency"
                                                value={option.value}
                                                checked={urgency === option.value}
                                                onChange={(event) => setUrgency(event.target.value)}
                                                className="mr-2 accent-emerald-700"
                                            />
                                            {option.label}
                                        </label>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-medium">
                                    Describe the issue
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                    minLength={10}
                                    maxLength={1000}
                                    rows={5}
                                    placeholder="Describe what happened and what help you need..."
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                                <p className="mt-1 text-right text-xs text-slate-500">
                                    {description.length}/1000
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                            >
                                Save demo report
                            </button>

                            {message && (
                                <p role="status" className="break-words rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
                                    {message}
                                </p>
                            )}
                        </div>
                    </form>

                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-bold">What to do next</h2>
                        <ol className="mt-5 space-y-5">
                            <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                  1
                </span>
                                <p className="text-sm leading-6 text-slate-600">
                                    If unsafe, move to a safe public location and contact emergency
                                    services when necessary.
                                </p>
                            </li>
                            <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                  2
                </span>
                                <p className="text-sm leading-6 text-slate-600">
                                    Contact someone you trust and share your situation directly.
                                </p>
                            </li>
                            <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                  3
                </span>
                                <p className="text-sm leading-6 text-slate-600">
                                    Keep relevant ride details available if you need to report an
                                    incident.
                                </p>
                            </li>
                        </ol>

                        <Link
                            to="/safety"
                            className="mt-6 inline-flex font-semibold text-emerald-700 hover:underline"
                        >
                            Visit Safety Centre →
                        </Link>
                    </aside>
                </section>

                <p className="mt-8 text-sm text-slate-500">
                    Demo only: reports are stored in this browser session. They are not sent
                    to Carvo support, and no live location tracking or emergency dispatch
                    is provided.
                </p>
            </main>
        </div>
    )
}
