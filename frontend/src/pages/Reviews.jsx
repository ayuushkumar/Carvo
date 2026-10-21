
import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialReviews = [
    {
        id: 1,
        driver: 'Aarav Sharma',
        route: 'Chandigarh → Delhi',
        rating: 5,
        comment: 'Very friendly driver. The ride was comfortable and on time.',
        date: '2026-10-12',
    },
    {
        id: 2,
        driver: 'Simran Kaur',
        route: 'Rajpura → Ludhiana',
        rating: 4,
        comment: 'Smooth journey and good communication throughout.',
        date: '2026-10-10',
    },
    {
        id: 3,
        driver: 'Kabir Singh',
        route: 'Delhi → Chandigarh',
        rating: 5,
        comment: 'Great experience. Would happily travel again!',
        date: '2026-10-08',
    },
]

export default function Reviews() {
    const [reviews, setReviews] = useState(initialReviews)
    const [rating, setRating] = useState('5')
    const [driver, setDriver] = useState('')
    const [route, setRoute] = useState('')
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!driver.trim() || !comment.trim()) {
            setMessage('Please enter a driver name and review.')
            return
        }

        const newReview = {
            id: Date.now(),
            driver: driver.trim(),
            route: route.trim() || 'Carvo ride',
            rating: Number(rating),
            comment: comment.trim(),
            date: new Date().toISOString().slice(0, 10),
        }

        setReviews((current) => [newReview, ...current])
        setDriver('')
        setRoute('')
        setComment('')
        setRating('5')
        setMessage('Your demo review has been added.')
    }

    const averageRating = reviews.length
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length
        ).toFixed(1)
        : '0.0'

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

                <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                        Community feedback
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Ratings & reviews
                    </h1>
                    <p className="mt-3 text-slate-600">
                        See how other travellers experienced their rides.
                    </p>
                </div>

                <section className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-sm text-slate-500">Average rating</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-700">
                            ★ {averageRating} / 5
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-sm text-slate-500">Total reviews</p>
                        <p className="mt-2 text-3xl font-bold">{reviews.length}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <p className="text-sm text-slate-500">Rating scale</p>
                        <p className="mt-2 text-3xl font-bold">1–5 ★</p>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                    <h2 className="text-xl font-bold">Write a review</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Share feedback about a Carvo ride.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="driver" className="mb-2 block text-sm font-medium">
                                    Driver name
                                </label>
                                <input
                                    id="driver"
                                    value={driver}
                                    onChange={(event) => setDriver(event.target.value)}
                                    required
                                    placeholder="Enter driver name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="route" className="mb-2 block text-sm font-medium">
                                    Route (optional)
                                </label>
                                <input
                                    id="route"
                                    value={route}
                                    onChange={(event) => setRoute(event.target.value)}
                                    placeholder="e.g. Chandigarh to Delhi"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="rating" className="mb-2 block text-sm font-medium">
                                Your rating
                            </label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(event) => setRating(event.target.value)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-emerald-500 sm:max-w-xs"
                            >
                                <option value="5">★★★★★ — Excellent</option>
                                <option value="4">★★★★☆ — Good</option>
                                <option value="3">★★★☆☆ — Average</option>
                                <option value="2">★★☆☆☆ — Poor</option>
                                <option value="1">★☆☆☆☆ — Very poor</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                                Your review
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                required
                                rows={4}
                                maxLength={500}
                                placeholder="How was your ride?"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
                            />
                            <p className="mt-1 text-right text-xs text-slate-500">
                                {comment.length}/500
                            </p>
                        </div>

                        {message && (
                            <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                        >
                            Submit review
                        </button>
                    </form>
                </section>

                <section className="mt-10">
                    <h2 className="text-xl font-bold">Traveller feedback</h2>
                    <div className="mt-4 space-y-4">
                        {reviews.map((review) => (
                            <article
                                key={review.id}
                                className="rounded-2xl border border-slate-200 bg-white p-6"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold">{review.driver}</h3>
                                        <p className="mt-1 text-sm text-slate-500">{review.route}</p>
                                    </div>
                                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    {'★'.repeat(review.rating)}
                                        {'☆'.repeat(5 - review.rating)} {review.rating}/5
                  </span>
                                </div>

                                <p className="mt-4 leading-7 text-slate-700">{review.comment}</p>
                                <p className="mt-3 text-xs text-slate-400">{review.date}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <p className="mt-8 text-sm text-slate-500">
                    Demo only: reviews are not verified and are not saved to a database.
                </p>
            </main>
        </div>
    )
}
