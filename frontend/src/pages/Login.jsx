
function Login() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <a href="/" className="text-2xl font-bold text-emerald-700">
                    carvo.
                </a>

                <h1 className="mt-8 text-3xl font-bold text-slate-900">
                    Welcome back
                </h1>
                <p className="mt-2 text-slate-600">
                    Log in to continue your journey.
                </p>

                <form className="mt-8 space-y-5">
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
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
                    >
                        Log in
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <a href="/frontend/src/pages/Signup" className="font-semibold text-emerald-700 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login
