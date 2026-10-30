import { Link, useLocation } from 'react-router-dom'

function BookingConfirmation() {
    const location = useLocation()
    const booking = location.state?.booking

    if (!booking) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="text-5xl">🚗</div>

                    <h1 className="mt-5 text-2xl font-extrabold">
                        No booking details found
                    </h1>

                    <p className="mt-3 text-slate-600">
                        Select a ride and complete the booking process to
                        view your confirmation.
                    </p>

                    <Link
                        to="/rides"
                        className="mt-6 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
                    >
                        Browse rides
                    </Link>
                </div>
            </div>
        )
    }

    const { ride, seats, total, bookingId, status } = booking

    const formattedDate = new Date(
        `${ride.date}T00:00:00`
    ).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const bookingReference = bookingId
        ? `CARVO-${bookingId}`
        : `CARVO-RIDE-${ride.id}`

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

                    <Link
                        to="/rides"
                        className="text-sm font-semibold text-slate-600 hover:text-emerald-700"
                    >
                        Browse rides
                    </Link>
                </nav>
            </header>

            <main className="mx-auto max-w-2xl px-6 py-12">

                {/* Confirmation message */}
                <section className="text-center">

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700">
                        ✓
                    </div>

                    <p className="mt-6 font-semibold text-emerald-700">
                        BOOKING CONFIRMED
                    </p>

                    <h1 className="mt-3 text-4xl font-extrabold">
                        Your ride is booked!
                    </h1>

                    <p className="mt-4 leading-7 text-slate-600">
                        Your booking has been successfully created.
                        Here is your booking summary.
                    </p>
                </section>

                {/* Booking summary */}
                <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                        <div>
                            <p className="text-sm text-slate-500">
                                Booking reference
                            </p>

                            <p className="mt-1 font-bold">
                                {bookingReference}
                            </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                            {status || 'CONFIRMED'}
                        </span>

                    </div>

                    {/* Journey details */}
                    <div className="py-6">

                        <p className="text-sm text-slate-500">
                            Your journey
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold">
                            {ride.from}{' '}
                            <span className="text-emerald-700">→</span>{' '}
                            {ride.to}
                        </h2>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2">

                            <div>
                                <p className="text-sm text-slate-500">
                                    Travel date
                                </p>

                                <p className="mt-1 font-semibold">
                                    {formattedDate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Departure
                                </p>

                                <p className="mt-1 font-semibold">
                                    {ride.departure}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Driver
                                </p>

                                <p className="mt-1 font-semibold">
                                    {ride.driver}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">
                                    Seats booked
                                </p>

                                <p className="mt-1 font-semibold">
                                    {seats} {seats === 1 ? 'seat' : 'seats'}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Price summary */}
                    <div className="rounded-xl bg-emerald-50 p-5">

                        <div className="flex justify-between gap-4 text-sm">
                            <span className="text-slate-600">
                                Price per seat
                            </span>

                            <span className="font-semibold">
                                ₹{ride.price}
                            </span>
                        </div>

                        <div className="mt-3 flex justify-between gap-4 text-sm">
                            <span className="text-slate-600">
                                Number of seats
                            </span>

                            <span className="font-semibold">
                                {seats}
                            </span>
                        </div>

                        <div className="mt-4 flex justify-between gap-4 border-t border-emerald-200 pt-4">

                            <span className="font-bold">
                                Total
                            </span>

                            <span className="text-xl font-extrabold text-emerald-800">
                                ₹{total}
                            </span>

                        </div>
                    </div>

                    <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                        Your booking is saved. Payment processing is not
                        currently available in Carvo.
                    </p>

                </section>

                {/* Navigation */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    <Link
                        to="/rides"
                        className="flex-1 rounded-lg bg-emerald-700 px-6 py-3 text-center font-semibold text-white hover:bg-emerald-800"
                    >
                        Find another ride
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold hover:bg-slate-100"
                    >
                        Back to home
                    </Link>

                </div>
            </main>
        </div>
    )
}

export default BookingConfirmation