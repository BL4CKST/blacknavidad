import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({
  page,
  setPage,
  handleLogout
}) {
  return (
    <aside
      className="
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-gradient-to-b from-slate-50 to-blue-50/40
        p-5
        shadow-sm
        md:sticky
        md:top-5
        md:h-[calc(100svh-40px)]
      "
    >
      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-2xl font-black text-slate-900">
          BLACKNAVIDAD
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Gestión Navideña
        </p>
      </div>

      {/* MENU */}
      <nav className="space-y-3">
        {/* INICIO */}

       
<button
  onClick={() => setPage("home")}
  className={`
    flex
    w-full
    items-center
    gap-3
    rounded-2xl
    px-4
    py-3
    font-semibold
    transition-all
    duration-300

    ${
      page === "home"
        ? `
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          text-white
          shadow-lg
          shadow-blue-200
        `
        : `
          text-slate-600
          hover:bg-white
          hover:text-slate-900
        `
    }
  `}
>
  <FontAwesomeIcon icon={faHouse} />
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
    font-semibold
    transition-all
    duration-300

    ${
      page === "register"
        ? `
          bg-gradient-to-r
          from-emerald-500
          to-green-500
          text-white
          shadow-lg
          shadow-emerald-200
        `
        : `
          text-slate-600
          hover:bg-white
          hover:text-slate-900
        `
    }
  `}
>
  <FontAwesomeIcon icon={faPlus} />
  Registrar Cliente
</button>
      </nav>
    </aside>
  );
} 