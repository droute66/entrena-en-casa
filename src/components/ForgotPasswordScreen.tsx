import { FormEvent, useState } from "react";
import { resetPassword } from "../auth";

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        setError(error.message);
        return;
      }

      setMessage(
        "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."
      );
    } catch {
      setError("Ocurrió un error. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
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
              RECUPERAR <span className="text-flame">CONTRASEÑA</span>
            </h1>

            <p className="text-sm text-smoke mt-2">
              Ingresá tu email y te enviaremos un enlace para crear una nueva
              contraseña.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-bold text-ink mb-2"
              >
                Email
              </label>

              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border-2 border-ink rounded-lg px-4 py-3 bg-white text-black outline-none focus:ring-2 focus:ring-lime"
              />
            </div>

            {error && (
              <div className="border-2 border-flame bg-flame/10 rounded-lg px-4 py-3 text-sm font-bold text-flame">
                {error}
              </div>
            )}

            {message && (
              <div className="border-2 border-pine bg-lime/20 rounded-lg px-4 py-3 text-sm font-bold text-ink">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-flame text-white border-2 border-ink rounded-lg px-4 py-3 font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar enlace"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}