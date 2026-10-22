import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.detail ||
                    "Invalid email or password."
                );
            }

            if (!data.token) {
                throw new Error("Login succeeded, but no token was returned.");
            }

            // Store the JWT for subsequent authenticated API requests.
            localStorage.setItem("carvoToken", data.token);
            localStorage.setItem("carvoUser", JSON.stringify({
                id: data.id,
                fullName: data.fullName,
                email: data.email,
            }));

            navigate("/profile");
        } catch (err) {
            setError(
                err instanceof TypeError
                    ? "Cannot connect to the server. Please try again."
                    : err.message
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <Link to="/" className="text-2xl font-bold text-emerald-700">
                    carvo.
                </Link>

                <h1 className="mt-8 text-3xl font-bold text-slate-900">
                    Welcome back
                </h1>

                <p className="mt-2 text-slate-600">
                    Log in to continue your journey.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                            value={formData.email}
                            onChange={handleChange}
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
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-emerald-700 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
