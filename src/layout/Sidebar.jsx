import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalculator,
  faChevronLeft,
  faChevronRight,
  faFire,
  faHouse,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  {
    key: "home",
    label: "Inicio",
    icon: faHouse,
    active: "from-cyan-500 to-blue-500",
    idleIcon: "bg-cyan-50 text-cyan-600",
  },
  {
    key: "register",
    label: "Registrar Cliente",
    icon: faPlus,
    active: "from-emerald-500 to-green-500",
    idleIcon: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "fuentes",
    label: "Ingresar Fuentes",
    icon: faFire,
    active: "from-orange-500 to-red-500",
    idleIcon: "bg-orange-50 text-orange-600",
  },
  {
    key: "accounting",
    label: "Contabilidad",
    icon: faCalculator,
    active: "from-slate-800 to-slate-950",
    idleIcon: "bg-slate-100 text-slate-700",
  },
];

export default function Sidebar({
  page,
  setPage,
  collapsed = false,
  setCollapsed,
}) {
  return (
    <aside
      className="
        w-full
        rounded-[28px]
        border
        border-slate-300
        bg-[#edf2f7]
        p-3
        transition-all
        duration-300
        md:sticky
        md:top-5
        md:h-[calc(100svh-40px)]
      "
    >
      <div
        className={`
          mb-7
          flex
          items-start
          justify-between
          gap-3
          ${collapsed ? "md:justify-center" : ""}
        `}
      >
        <div className={collapsed ? "md:hidden" : ""}>
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

          <h1 className="mt-4 text-[26px] font-black leading-none tracking-tight text-slate-900">
            INV. MOISES
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-600">
            Panel administrador
          </p>
        </div>

        {setCollapsed && (
          <button
            onClick={() => setCollapsed((value) => !value)}
            className="
              hidden
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition
              hover:border-slate-300
              hover:shadow-md
              md:flex
            "
            aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
            title={collapsed ? "Expandir" : "Contraer"}
          >
            <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
          </button>
        )}
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = page === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                px-3
                py-3
                text-sm
                font-semibold
                transition-all
                duration-200
                ${collapsed ? "md:justify-center md:px-0" : ""}
                ${
                  active
                    ? `bg-gradient-to-r ${item.active} text-white`
                    : "bg-white/70 text-slate-700 hover:bg-white"
                }
              `}
              title={item.label}
            >
              <div
                className={`
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  ${active ? "bg-white/20" : item.idleIcon}
                `}
              >
                <FontAwesomeIcon icon={item.icon} />
              </div>

              <span className={collapsed ? "md:hidden" : ""}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
