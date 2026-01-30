import { useEffect, useMemo, useState } from "react";
import api from "../api";
import Modal from "./Modal";

function Field({ label, value }) {
  return (
    <div className="rounded-xl border bg-slate-50 px-4 py-3">
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="mt-1 text-sm text-slate-900">{value || "—"}</div>
    </div>
  );
}

const isEmailValid = (email) => {
  const v = String(email || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

const isPhoneValid = (phone) => {
  const v = String(phone || "").trim();
  if (!/^[0-9+\-\s()]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
};

const isPasswordStrong = (pass) => {
  const v = String(pass || "");
  return v.length >= 8 && /\d/.test(v);
};

export default function ProfileCard() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const fetchMe = async () => {
    const res = await api.get("/auth/me");
    setUser(res.data);
    setForm((f) => ({
      ...f,
      name: res.data.name || "",
      last_name: res.data.last_name || "",
      email: res.data.email || "",
      phone: res.data.phone || "",
    }));
  };

  useEffect(() => {
    setLoading(true);
    fetchMe()
      .catch(() => setError("Nie udało się pobrać danych użytkownika."))
      .finally(() => setLoading(false));
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const emailOk = useMemo(() => isEmailValid(form.email), [form.email]);
  const phoneOk = useMemo(() => isPhoneValid(form.phone), [form.phone]);

  const passwordProvided = !!form.password;
  const passwordOk = useMemo(
    () => !passwordProvided || isPasswordStrong(form.password),
    [passwordProvided, form.password]
  );

  const passwordsMatch = useMemo(() => {
    if (!passwordProvided) return true;
    return form.password === form.password_confirmation;
  }, [passwordProvided, form.password, form.password_confirmation]);

  const canSubmit = useMemo(() => {
    if (!form.name || !form.last_name || !form.email || !form.phone) return false;
    if (!emailOk || !phoneOk) return false;
    if (!passwordOk || !passwordsMatch) return false;
    return true;
  }, [form, emailOk, phoneOk, passwordOk, passwordsMatch]);

  const closeModal = () => {
    setOpen(false);
    setError(null);
    setSuccess(null);
    setForm((f) => ({ ...f, password: "", password_confirmation: "" }));
  };

  const clientSideError = useMemo(() => {
    if (!form.name.trim()) return "Podaj imię.";
    if (!form.last_name.trim()) return "Podaj nazwisko.";
    if (!form.email.trim()) return "Podaj email.";
    if (!emailOk) return "Podaj poprawny adres email.";
    if (!form.phone.trim()) return "Podaj numer telefonu.";
    if (!phoneOk) return "Podaj poprawny numer telefonu.";
    if (passwordProvided && !passwordOk)
      return "Hasło musi mieć minimum 8 znaków i zawierać przynajmniej jedną cyfrę.";
    if (passwordProvided && !passwordsMatch) return "Hasła nie są takie same.";
    return null;
  }, [form, emailOk, phoneOk, passwordProvided, passwordOk, passwordsMatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (clientSideError) {
      setError(clientSideError);
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: form.name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      if (passwordProvided) {
        payload.password = form.password;
        payload.password_confirmation = form.password_confirmation;
      }

      await api.patch("/auth/me", payload);

      setSuccess("Dane zostały zapisane.");
      await fetchMe();

      setForm((f) => ({ ...f, password: "", password_confirmation: "" }));

      setTimeout(() => closeModal(), 600);
    } catch (e2) {
      const status = e2?.response?.status;

      if (status === 422) {
        const errors = e2?.response?.data?.errors;

        const raw =
          errors?.name?.[0] ||
          errors?.last_name?.[0] ||
          errors?.email?.[0] ||
          errors?.phone?.[0] ||
          errors?.password?.[0] ||
          e2?.response?.data?.message;

        const msg = String(raw || "Niepoprawne dane.");

        if (msg.toLowerCase().includes("email")) {
          setError("Podaj poprawny adres email.");
        } else if (msg.toLowerCase().includes("phone")) {
          setError("Podaj poprawny numer telefonu.");
        } else if (msg.toLowerCase().includes("password")) {
          setError("Hasło musi mieć minimum 8 znaków i zawierać przynajmniej jedną cyfrę.");
        } else {
          setError(msg);
        }
      } else {
        setError("Nie udało się zapisać danych.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-slate-500">Ładowanie danych…</p>;

  return (
    <>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Moje dane</h2>
            <p className="mt-1 text-sm text-slate-600">
              Podgląd danych konta i edycja profilu.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setSuccess(null);
              setOpen(true);
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Edytuj dane
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="Imię" value={user?.name} />
          <Field label="Nazwisko" value={user?.last_name} />
          <Field label="Email" value={user?.email} />
          <Field label="Telefon" value={user?.phone} />
        </div>
      </div>

      <Modal open={open} title="Edytuj dane konta" onClose={closeModal}>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-sm text-slate-700">Imię</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                autoComplete="given-name"
              />
            </div>

            <div>
              <label className="text-sm text-slate-700">Nazwisko</label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                autoComplete="family-name"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                autoComplete="email"
              />
              {!emailOk && form.email.trim() && (
                <p className="mt-1 text-sm text-red-600">Podaj poprawny adres email.</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm text-slate-700">Telefon</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="+48 123 456 789"
                inputMode="tel"
                autoComplete="tel"
              />
              {!phoneOk && form.phone.trim() && (
                <p className="mt-1 text-sm text-red-600">
                  Podaj poprawny numer telefonu (cyfry, spacje, +, myślnik, nawiasy).
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-800">
              Zmiana hasła (opcjonalnie)
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Minimum 8 znaków i przynajmniej jedna cyfra.
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input
                type="password"
                name="password"
                placeholder="Nowe hasło"
                value={form.password}
                onChange={onChange}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                autoComplete="new-password"
              />
              <input
                type="password"
                name="password_confirmation"
                placeholder="Powtórz hasło"
                value={form.password_confirmation}
                onChange={onChange}
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                autoComplete="new-password"
              />
            </div>

            {passwordProvided && !passwordOk && (
              <p className="mt-2 text-sm text-red-600">
                Hasło musi mieć minimum 8 znaków i zawierać przynajmniej jedną cyfrę.
              </p>
            )}

            {passwordProvided && passwordOk && !passwordsMatch && (
              <p className="mt-2 text-sm text-red-600">Hasła nie są takie same.</p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-100"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={saving || !canSubmit}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              title={!canSubmit ? clientSideError || "Uzupełnij poprawnie dane." : ""}
            >
              {saving ? "Zapisywanie…" : "Zapisz"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
