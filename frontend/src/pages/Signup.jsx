
function Signup() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <a href="/" className="text-2xl font-bold text-emerald-700">
                    carvo.
                </a>

                <h1 className="mt-8 text-3xl font-bold text-slate-900">
                    Create your account
                </h1>
                <p className="mt-2 text-slate-600">
                    Join Carvo and make every journey smarter.
                </p>

                <form className="mt-8 space-y-5">
                    <div>
                        <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                            Full name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            placeholder="At least 8 characters"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-semibold text-emerald-700 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup
