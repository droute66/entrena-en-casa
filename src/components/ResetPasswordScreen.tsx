import { FormEvent, useState } from "react";
import { supabase } from "../lib/supabase";

export function ResetPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage(
        "Contraseña actualizada correctamente. Ya podés ingresar con tu nueva contraseña."
      );
    } catch {
      setError("Ocurrió un error. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
      <div
        className="pointer-events-none fixed inset-0 bg-dots-light opacity-40"
        aria-hidden
      />

      <div className="relative w-full max-w-md">
        <div className="bg-chalk border-2 border-ink rounded-2xl shadow-chalk p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl tracking-[0.05em] text-ink">
              NUEVA <span className="text-flame">CONTRASEÑA</span>
            </h1>

            <p className="text-sm text-smoke mt-2">
              Elegí una nueva contraseña para tu cuenta.
            </p>
          </div>

          {message ? (
            <div className="space-y-5">
              <div className="border-2 border-pine bg-lime/20 rounded-lg px-4 py-3 text-sm font-bold text-ink">
                {message}
              </div>

              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full bg-flame text-white border-2 border-ink rounded-lg px-4 py-3 font-bold transition-transform hover:-translate-y-0.5"
              >
                Volver a iniciar sesión
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-bold text-ink mb-2"
                >
                  Nueva contraseña
                </label>

                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  autoComplete="new-password"
                  className="w-full border-2 border-ink rounded-lg px-4 py-3 bg-white text-black outline-none focus:ring-2 focus:ring-lime"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-bold text-ink mb-2"
                >
                  Repetir contraseña
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repetí tu contraseña"
                  required
                  autoComplete="new-password"
                  className="w-full border-2 border-ink rounded-lg px-4 py-3 bg-white text-black outline-none focus:ring-2 focus:ring-lime"
                />
              </div>

              {error && (
                <div className="border-2 border-flame bg-flame/10 rounded-lg px-4 py-3 text-sm font-bold text-flame">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-flame text-white border-2 border-ink rounded-lg px-4 py-3 font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "Cambiar contraseña"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

