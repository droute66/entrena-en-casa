import { FormEvent, useState } from "react";
import { resetPassword, signIn, signUp } from "../auth";

type AuthMode = "login" | "register";

export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);

        if (error) {
          setError(error.message);
          return;
        }
      } else {
        const { data, error } = await signUp(email, password);

        if (error) {
          setError(error.message);
          return;
        }

        if (!data.session) {
          setMessage(
            "Cuenta creada. Revisá tu correo electrónico para confirmar tu cuenta."
          );
        } else {
          setMessage("Cuenta creada correctamente.");
        }
      }
    } catch {
      setError("Ocurrió un error. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode((current) => (current === "login" ? "register" : "login"));
    setError("");
    setMessage("");
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
            <div className="mx-auto mb-4 w-14 h-14 bg-pine border-2 border-ink rounded-xl grid place-items-center text-lime">
              <span className="font-display text-2xl">EC</span>
            </div>

            <h1 className="font-display text-3xl tracking-[0.05em] text-ink">
              ENTRENA <span className="text-flame">EN CASA</span>
            </h1>

            <p className="text-sm text-smoke mt-2">
              {mode === "login"
                ? "Ingresá para continuar tu entrenamiento."
                : "Creá tu cuenta y guardá tu progreso."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-ink mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className="w-full border-2 border-ink rounded-lg px-4 py-3 bg-white text-black outline-none focus:ring-2 focus:ring-lime"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-ink mb-2"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
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
              {loading
                ? "Procesando..."
                : mode === "login"
                ? "Iniciar sesión"
                : "Crear cuenta"}
            </button>

{mode === "login" && (
  <button
    type="button"
    onClick={() => {
      window.location.href = "/forgot-password";
    }}
    className="w-full text-sm font-bold text-pine hover:text-flame transition-colors"
  >
    ¿Olvidaste tu contraseña?
  </button>
)}
          </form>

          <div className="mt-6 pt-6 border-t-2 border-ink/20 text-center">
            <p className="text-sm text-smoke">
              {mode === "login"
                ? "¿Todavía no tenés una cuenta?"
                : "¿Ya tenés una cuenta?"}
            </p>

            <button
              type="button"
              onClick={switchMode}
              className="mt-2 font-bold text-pine hover:text-flame transition-colors"
            >
              {mode === "login" ? "Crear una cuenta" : "Iniciar sesión"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
