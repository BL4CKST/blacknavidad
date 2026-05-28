import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/auth";

export default function Login({
  setIsAuthenticated,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      setIsAuthenticated(true);
    } catch (err) {
      setError(
        "Correo o contraseña incorrectos"
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-[100svh] bg-[#eef2f7] p-5">
      <div
        className="
          mx-auto
          grid
          min-h-[calc(100svh-40px)]
          max-w-[1400px]
          overflow-hidden
          rounded-[40px]
          border
          border-slate-200
          bg-white
          shadow-xl
          md:grid-cols-2
        "
      >
        {/* LEFT */}
        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-gradient-to-br
            from-blue-600
            via-blue-500
            to-cyan-400
            p-12
            md:flex
            md:flex-col
            md:justify-between
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              -left-20
              top-0
              h-72
              w-72
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              h-80
              w-80
              rounded-full
              bg-cyan-300/10
            "
          />

          {/* BRAND */}
          <div className="relative z-10">
            <h1 className="text-6xl font-black text-white">
              BLACK
            </h1>

            <h1 className="text-6xl font-black text-cyan-100">
              NAVIDAD
            </h1>

            <p className="mt-6 max-w-md text-lg text-blue-100">
              Sistema profesional de gestión
              navideña para pedidos,
              atención y entregas rápidas.
            </p>
          </div>

          {/* FOOTER */}
          <div className="relative z-10">
            <p className="text-sm text-blue-100">
              INV MOISES © 2026
            </p>
          </div>
        </section>

        {/* RIGHT */}
        <section
          className="
            flex
            items-center
            justify-center
            p-6
            md:p-12
          "
        >
          <div className="w-full max-w-md">
            {/* MOBILE */}
            <div className="mb-10 md:hidden">
              <h1 className="text-4xl font-black text-slate-900">
                BLACKNAVIDAD
              </h1>

              <p className="mt-2 text-slate-500">
                Gestión navideña profesional
              </p>
            </div>

            {/* TITLE */}
            <div className="mb-10">
              <h2 className="text-4xl font-black text-slate-900">
                Bienvenido
              </h2>

              <p className="mt-2 text-slate-500">
                Inicia sesión para continuar
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="correo@gmail.com"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-4
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Contraseña
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-4
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-2xl
                  bg-slate-900
                  px-6
                  py-4
                  text-lg
                  font-bold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-slate-800
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Ingresando..."
                  : "Entrar al sistema"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}