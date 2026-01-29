import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="font-semibold tracking-tight">
            Bakery
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            {token && role === "CLIENT" && (
              <Link className="rounded-lg px-2 py-1 hover:bg-slate-100" to="/client">
                Panel klienta
              </Link>
            )}
            {token && role === "ADMIN" && (
              <Link className="rounded-lg px-2 py-1 hover:bg-slate-100" to="/admin">
                Panel admina
              </Link>
            )}
          </nav>

          <div className="flex-1" />

          {!token ? (
            <div className="flex items-center gap-2">
              <Link className="rounded-xl px-3 py-2 text-sm hover:bg-slate-100" to="/login">
                Logowanie
              </Link>
              <Link
                className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
                to="/register"
              >
                Rejestracja
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-100"
            >
              Wyloguj
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
