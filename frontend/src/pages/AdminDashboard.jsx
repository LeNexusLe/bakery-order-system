import ProfileCard from "../components/ProfileCard";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Panel administratora</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tu będzie zarządzanie użytkownikami, produktami i zamówieniami.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium">Użytkownicy</div>
          <div className="mt-1 text-sm text-slate-600">CRUD użytkowników.</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium">Produkty</div>
          <div className="mt-1 text-sm text-slate-600">Oferta i dostępność.</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium">Zamówienia</div>
          <div className="mt-1 text-sm text-slate-600">Statusy i realizacja.</div>
        </div>
      </div>

      <ProfileCard />
    </div>
  );
}
