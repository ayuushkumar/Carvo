
import { Link } from 'react-router-dom'

const safetyTips = [
    {
        number: '01',
        title: 'Check your ride details',
        description:
            'Confirm the driver, vehicle details, pickup point, and destination before starting your journey.',
    },
    {
        number: '02',
        title: 'Share your trip',
        description:
            'Tell a trusted friend or family member your route and expected arrival time.',
    },
    {
        number: '03',
        title: 'Choose a public pickup point',
        description:
            'Whenever possible, meet in a well-lit, public place.',
    },
    {
        number: '04',
        title: 'Trust your instincts',
        description:
            'If something feels unsafe, do not start the ride. Move somewhere safe and seek help.',
    },
]

export default function Safety() {
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

                <section className="mt-6 rounded-3xl bg-emerald-800 p-8 text-white sm:p-12">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
                        Your journey matters
                    </p>
                    <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
                        Carvo Safety Centre
                    </h1>
                    <p className="mt-4 max-w-2xl leading-7 text-emerald-50">
                        Practical guidance to help you prepare for a safer shared journey.
                    </p>
                </section>

                <section className="mt-10">
                    <h2 className="text-2xl font-bold">Before and during your ride</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {safetyTips.map((tip) => (
                            <article
                                key={tip.number}
                                className="rounded-2xl border border-slate-200 bg-white p-6"
                            >
                                <p className="text-sm font-bold text-emerald-700">{tip.number}</p>
                                <h3 className="mt-3 text-lg font-bold">{tip.title}</h3>
                                <p className="mt-2 leading-7 text-slate-600">{tip.description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <h2 className="text-xl font-bold text-amber-900">If you feel unsafe</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-amber-950">
                        <li>Move to a safe, public place if possible.</li>
                        <li>Contact someone you trust and share your location directly.</li>
                        <li>If you are in immediate danger in India, call emergency number 112.</li>
                    </ul>
                    <a
                        href="tel:112"
                        className="mt-5 inline-flex rounded-xl bg-amber-700 px-5 py-3 font-semibold text-white hover:bg-amber-800"
                    >
                        Call 112
                    </a>
                    <p className="mt-3 text-sm text-amber-900">
                        This opens your phone's dialler; it is not an in-app emergency service.
                    </p>
                </section>

                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-bold">Important to know</h2>
                    <p className="mt-3 leading-7 text-slate-600">
                        This is an informational demo. It does not provide live trip tracking,
                        driver verification, or automatic emergency alerts.
                    </p>
                </section>
            </main>
        </div>
    )
}
