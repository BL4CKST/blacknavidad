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
    <main
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#050816]
      "
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* TOP GLOW */}
        

        {/* BOTTOM GLOW */}
        <div
          className="
            absolute
            bottom-[-180px]
            right-[-180px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-green-500/10
          "
        />

        {/* CENTER LIGHT */}
        
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          items-center
          justify-center
          p-4
        "
      >
        <div
          className="
            grid
            w-full
            max-w-[1200px]
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.03]
            shadow-[0_20px_80px_rgba(0,0,0,0.45)]
            md:grid-cols-2
          "
        >
          {/* LEFT */}
          <section
            className="
              relative
              hidden
              overflow-hidden
              border-r
              border-white/5
              bg-gradient-to-br
              from-cyan-500/10
              to-violet-500/10
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
                left-[-80px]
                top-[-80px]
                h-72
                w-72
                rounded-full
                bg-cyan-400/10
              "
            />

            <div
              className="
                absolute
                bottom-[-100px]
                right-[-100px]
                h-80
                w-80
                rounded-full
                bg-green-500/10
              "
            />

            {/* BRAND */}
            <div className="relative z-10">
              <div
                className="
                  inline-flex
                  rounded-2xl
                  border
                  border-green-400/20
                  bg-green-400/10
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-green-300
                "
              >
                Creado por BLACK SALAS
              </div>

              <h1
                className="
                  mt-8
                  text-6xl
                  font-black
                  leading-none
                  tracking-tight
                  text-white
                "
              >
                SISTEMA
                <br />
                HORNEADOS
              </h1>

              <p
                className="
                  mt-6
                  max-w-md
                  text-lg
                  leading-relaxed
                  text-slate-300
                "
              >
                Administra pedidos,
                clientes y entregas
                navideñas de forma rápida
                y profesional.
              </p>
            </div>
          </section>

          {/* RIGHT */}
          <section
            className="
              relative
              flex
              items-center
              justify-center
              p-6
              md:p-12
            "
          >
            <div className="w-full max-w-md">
              {/* MOBILE TITLE */}
              <div className="mb-10 md:hidden">
                <div
                  className="
                    inline-flex
                    rounded-2xl
                    border
                    border-green-400/20
                    bg-green-400/10
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-green-300
                  "
                >
                  Creado por BLACK SALAS
                </div>

                <h1
                  className="
                    mt-6
                    text-[38px]
                    font-black
                    leading-none
                    tracking-tight
                    text-white
                  "
                >
                  SISTEMA
                  <br />
                  HORNEADOS
                </h1>

                <p className="mt-4 text-slate-400">
                  Gestión premium de pedidos
                  navideños.
                </p>
              </div>

              {/* TITLE */}
              <div className="mb-10">
                <h2
                  className="
                    text-4xl
                    font-black
                    text-white
                  "
                >
                  Bienvenido
                </h2>

                <p className="mt-2 text-slate-400">
                  Inicia sesión para continuar
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div
                  className="
                    mb-5
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    text-sm
                    font-medium
                    text-red-300
                  "
                >
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
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@gmail.com"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-5
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-500
                      focus:border-cyan-400/40
                      focus:bg-white/[0.06]
                    "
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-slate-300
                    "
                  >
                    Contraseña
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-5
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-500
                      focus:border-cyan-400/40
                      focus:bg-white/[0.06]
                    "
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    bg-gradient-to-r
                    from-green-500
                    to-green-500
                    text-base
                    font-bold
                    text-white
                    
                    transition-all
                    duration-300
                    hover:scale-[1.01]
                    
                    disabled:opacity-50
                  "
                >
                  {loading
                    ? "Ingresando..."
                    : "Ingresar"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}