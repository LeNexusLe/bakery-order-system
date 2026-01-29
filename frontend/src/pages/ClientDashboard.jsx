export default function ClientDashboard() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Panel klienta</h1>
        <p className="mt-1 text-sm text-slate-600">
          Tu będzie podgląd zamówień, statusy i dane konta.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium">Moje zamówienia</div>
          <div className="mt-1 text-sm text-slate-600">Lista zamówień klienta.</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium">Profil</div>
          <div className="mt-1 text-sm text-slate-600">Edycja danych i hasła.</div>
        </div>
      </div>
    </div>
  );
}
