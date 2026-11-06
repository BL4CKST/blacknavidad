import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faBoxOpen,
  faClock,
  faMagnifyingGlass,
  faSpinner,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { getClientByCode } from "../supabase/clients";
import PublicClientModal from "../components/PublicClientModal";

const normalizeCode = (value = "") => {
  const raw = String(value).trim().toUpperCase().replace(/\s+/g, "");

  if (!raw) return "";
  if (/^C-\d+$/.test(raw)) return raw;
  if (/^C\d+$/.test(raw)) return `C-${raw.slice(1)}`;
  if (/^\d+$/.test(raw)) return `C-${raw}`;
  return raw;
};

export default function PublicHome({ onLogin }) {
  const [serviceId, setServiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [client, setClient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const pending = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending.current) return;

    const code = normalizeCode(serviceId);

    if (!/^C-\d{1,19}$/.test(code)) {
      setError("Ingresa un código como C-8.");
      return;
    }

    pending.current = true;
    setLoading(true);
    setError("");

    try {
      const result = await getClientByCode(code);

      if (!result) {
        setClient(null);
        setOpenModal(false);
        setError(`No encontramos el pedido ${code}.`);
        return;
      }

      setClient(result);
      setOpenModal(true);
    } catch {
      setError("No pudimos consultar el pedido. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      pending.current = false;
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-[#eef5fb] text-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,_rgba(14,165,233,0.18),_rgba(255,255,255,0.92)_45%,_rgba(16,185,129,0.13))]" />
        <div className="absolute left-0 top-24 h-px w-full bg-white/80" />
        <div className="absolute -left-28 top-28 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
        <div className="absolute -right-28 top-16 h-96 w-96 rounded-full bg-cyan-200/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-30">
          <nav className="rounded-[28px] border border-white/80 bg-white/85 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl md:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/20">
                  IM
                </div>

                <div className="leading-none">
                  <p className="text-[12px] font-black uppercase tracking-[0.28em] text-slate-400">
                    Inv. Moisés
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Edicion Navidad 
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onLogin}
                  className="hidden h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:inline-flex"
                >
                  <FontAwesomeIcon icon={faUser} />
                  Acceso
                </button>

                <button
                  onClick={() => setOpenMenu((value) => !value)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:shadow-md lg:hidden"
                  aria-label="Abrir navegación"
                  aria-expanded={openMenu}
                >
                  <FontAwesomeIcon icon={openMenu ? faXmark : faBars} />
                </button>
              </div>
            </div>

            {openMenu && (
              <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4 lg:hidden">
                <button
                  onClick={onLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white"
                >
                  <FontAwesomeIcon icon={faUser} />
                  Administrador
                </button>
              </div>
            )}
          </nav>
        </header>

        <section
          id="consulta"
          className="grid flex-1 items-center gap-8 py-8 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
        >
          <div className="order-1 lg:order-1">
            <h1 className="max-w-3xl text-[2.35rem] font-black leading-[1.02] tracking-tight text-slate-950 sm:text-[3.6rem] lg:text-[4.25rem]">
              Consulte el estado de sus fuentes.
            </h1>

            <p className="mt-3 max-w-1xl text-base leading-5 text-slate-600 sm:text-lg">
              Ingrese su código de cliente y verifique si su fuente está en
              el horno, listo para recoger o ya entregado.
            </p>

          </div>

          <div className="order-2 lg:order-2">
            <div className="mx-auto w-full max-w-xl rounded-[34px] border border-white/90 bg-white/80 p-2 shadow-[0_35px_100px_rgba(15,23,42,0.16)] backdrop-blur-2xl sm:rounded-[42px]">
              <div className="rounded-[28px] bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-5 sm:rounded-[34px] sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/90 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700 shadow-sm">
                      <FontAwesomeIcon icon={faClock} className="text-emerald-500" />
                      Estado del pedido
                    </div>
                  
                  </div>

                  <div className="hidden h-16 w-16 items-center justify-center rounded-3xl bg-slate-950 text-2xl text-white shadow-xl shadow-slate-950/20 sm:flex">
                    <FontAwesomeIcon icon={faBoxOpen} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-4">

                  <div className="rounded-[26px] border border-slate-200 bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.07)] focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
                    <div className="flex min-h-[68px] items-center gap-4 rounded-[20px] bg-slate-50 px-4 sm:px-5">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="text-lg text-slate-400"
                      />

                      <input
                        id="service-code"
                        disabled={loading}
                        type="text"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        placeholder="C-1"
                        className="w-full bg-transparent text-base font-semibold text-slate-900 outline-none placeholder:font-medium placeholder:text-slate-400 md:text-lg"
                        autoCapitalize="characters"
                        autoComplete="off"
                        spellCheck="false"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-[20px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-[26px]
                      bg-[linear-gradient(135deg,_#06b6d4,_#2563eb_62%,_#1d4ed8)]
                      px-6
                      py-4
                      text-base
                      font-black
                      text-white
                      shadow-[0_20px_45px_rgba(37,99,235,0.30)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_25px_55px_rgba(37,99,235,0.35)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin"
                        />
                        Consultando...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        Consultar Estado
                        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                      </>
                    )}
                  </button>
                </form>

                <div
                  id="proceso"
                  className="mt-6 grid grid-cols-3 gap-2 rounded-[24px] border border-slate-100 bg-slate-50 p-2 text-center"
                >
                  {["En espera", "Listo", "Entregado"].map((step, index) => (
                    <div
                      key={step}
                      className="rounded-[18px] bg-white px-2 py-3 shadow-sm"
                    >
                      <p
                        className={[
                          "mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-black text-white",
                          index === 0 && "bg-blue-600",
                          index === 1 && "bg-emerald-500",
                          index === 2 && "bg-red-500",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {index + 1}
                      </p>
                      <p className="mt-2 text-[11px] font-black uppercase tracking-wide text-slate-500">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>

      {openModal && client && (
        <PublicClientModal client={client} onClose={closeModal} />
      )}
    </main>
  );
}
