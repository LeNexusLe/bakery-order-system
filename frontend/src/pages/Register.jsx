import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      navigate("/client");
    } catch (e2) {
      const status = e2?.response?.status;

      if (status === 422) {
        const errors = e2?.response?.data?.errors;
        if (errors) {
          const firstMsg =
            errors.name?.[0] ||
            errors.email?.[0] ||
            errors.password?.[0] ||
            "Niepoprawne dane.";
          setErr(firstMsg);
        } else {
          setErr("Niepoprawne dane.");
        }
      } else {
        setErr("Nie udało się zarejestrować. Spróbuj ponownie.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">Rejestracja</h1>
        <p className="mt-1 text-sm text-slate-600">
          Utwórz konto klienta.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-sm text-slate-700">Imię</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Twoje imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Email</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="np. jan@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Hasło</label>
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="minimum 8 znaków"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {err && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Tworzenie konta..." : "Utwórz konto"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Masz już konto?{" "}
          <Link className="font-medium text-slate-900 hover:underline" to="/login">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
}
