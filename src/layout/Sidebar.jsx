import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faPlus,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({
  page,
  setPage,
}) {
  return (
    <aside
      className="
        w-full
        rounded-[28px]
        border
        border-slate-300
        bg-[#edf2f7]
        p-4
        md:sticky
        md:top-5
        md:h-[calc(100svh-40px)]
      "
    >
      {/* LOGO */}
      <div className="mb-8">
        <div
          className="
            inline-flex
            rounded-full
            bg-gradient-to-r
            from-violet-500
            to-indigo-500
            px-3
            py-1
            text-[11px]
            font-black
            uppercase
            tracking-[3px]
            text-white
          "
        >
          Navidad 2026
        </div>

        <h1 className="mt-4 text-[28px] font-black leading-none tracking-tight text-slate-900">
          INV. MOISES
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-600">
          Panel adminsitrador
        </p>
      </div>

      {/* MENU */}
      <nav className="space-y-2">
        {/* INICIO */}
        <button
          onClick={() =>
            setPage("home")
          }
          className={`
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-sm
            font-bold
            transition-all
            duration-200

            ${
              page === "home"
                ? `
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  text-white
                `
                : `
                  bg-white/70
                  text-slate-700
                  hover:bg-white
                `
            }
          `}
        >
          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl

              ${
                page === "home"
                  ? "bg-white/20"
                  : "bg-cyan-50 text-cyan-600"
              }
            `}
          >
            <FontAwesomeIcon
              icon={faHouse}
            />
          </div>

          Inicio
        </button>

        {/* REGISTRAR */}
        <button
          onClick={() =>
            setPage("register")
          }
          className={`
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-sm
            font-bold
            transition-all
            duration-200

            ${
              page === "register"
                ? `
                  bg-gradient-to-r
                  from-emerald-500
                  to-green-500
                  text-white
                `
                : `
                  bg-white/70
                  text-slate-700
                  hover:bg-white
                `
            }
          `}
        >
          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl

              ${
                page === "register"
                  ? "bg-white/20"
                  : "bg-emerald-50 text-emerald-600"
              }
            `}
          >
            <FontAwesomeIcon
              icon={faPlus}
            />
          </div>

          Registrar Cliente
        </button>

        {/* FUENTES */}
        <button
          onClick={() =>
            setPage("fuentes")
          }
          className={`
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            px-4
            py-3
            text-sm
            font-bold
            transition-all
            duration-200

            ${
              page === "fuentes"
                ? `
                  bg-gradient-to-r
                  from-orange-500
                  to-red-500
                  text-white
                `
                : `
                  bg-white/70
                  text-slate-700
                  hover:bg-white
                `
            }
          `}
        >
          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl

              ${
                page === "fuentes"
                  ? "bg-white/20"
                  : "bg-orange-50 text-orange-600"
              }
            `}
          >
            <FontAwesomeIcon
              icon={faFire}
            />
          </div>

          Ingresar Fuentes
        </button>
      </nav>
    </aside>
  );
}