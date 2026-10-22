
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        bio: "",
    });

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            const token = localStorage.getItem("carvoToken");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:8080/api/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem("carvoToken");
                    localStorage.removeItem("carvoUser");
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Unable to load your profile.");
                }

                const data = await response.json();

                setProfile({
                    name: data.fullName || "",
                    email: data.email || "",
                    phone: "",
                    city: "",
                    bio: "",
                });
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

        loadProfile();
    }, [navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProfile((current) => ({ ...current, [name]: value }));
        setSaved(false);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Only local UI fields can be edited at this stage.
        // Persistent profile updates need a backend endpoint.
        setEditing(false);
        setSaved(true);
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-600">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <Link to="/" className="text-2xl font-bold tracking-tight text-emerald-700">
                        carvo.
                    </Link>

                    <nav className="flex items-center gap-5 text-sm font-medium">
                        <Link to="/rides" className="text-slate-600 hover:text-emerald-700">
                            Find a ride
                        </Link>
                        <Link to="/my-rides" className="text-slate-600 hover:text-emerald-700">
                            My Rides
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                localStorage.removeItem("carvoToken");
                                localStorage.removeItem("carvoUser");
                                navigate("/login");
                            }}
                            className="text-slate-600 hover:text-emerald-700"
                        >
                            Log out
                        </button>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <Link to="/" className="text-sm font-medium text-emerald-700 hover:underline">
                    ← Back to home
                </Link>

                <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                        Account settings
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Your profile
                    </h1>
                    <p className="mt-3 text-slate-600">
                        Manage the details other Carvo members can see about you.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div className="mt-8 grid gap-6 md:grid-cols-[260px_1fr]">
                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                            {profile.name.trim().charAt(0).toUpperCase() || "U"}
                        </div>
                        <h2 className="mt-4 text-lg font-bold">
                            {profile.name || "Your name"}
                        </h2>
                        <p className="mt-1 break-all text-sm text-slate-500">
                            {profile.email}
                        </p>
                        <div className="mt-5 border-t border-slate-100 pt-4">
                            <p className="text-sm text-slate-500">Account status</p>
                            <p className="mt-1 font-semibold text-emerald-700">
                                Registered Carvo member
                            </p>
                        </div>
                    </aside>

                    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold">Personal information</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Keep your contact details up to date.
                                </p>
                            </div>

                            {!editing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSaved(false);
                                        setEditing(true);
                                    }}
                                    className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                                >
                                    Edit profile
                                </button>
                            )}
                        </div>

                        {saved && (
                            <p role="status" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                                Changes are temporary and haven't been saved to the server.
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
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
                                    value={profile.email}
                                    disabled
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none disabled:bg-slate-50"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                                        Phone number
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Enter phone number"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="city" className="mb-2 block text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        value={profile.city}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        placeholder="Your city"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="bio" className="mb-2 block text-sm font-medium">
                                    About you
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={profile.bio}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    rows={4}
                                    placeholder="A little about yourself and your travel preferences..."
                                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-50"
                                />
                            </div>

                            {editing && (
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                                    >
                                        Save changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditing(false);
                                            setSaved(false);
                                        }}
                                        className="rounded-xl border border-slate-200 px-5 py-3 font-semibold hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </section>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                    Your name and email are loaded from your Carvo account. Phone,
                    city, bio, and profile updates aren't connected to the backend yet.
                </p>
            </main>
        </div>
    );
}
