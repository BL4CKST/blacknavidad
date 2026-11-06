import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBoxOpen,
  faCircleCheck,
  faClock,
  faFire,
  faTruckFast,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";


const getStatusConfig = (estado) => {
  if (estado === "listo") {
    return {
      label: "LISTO",
      title: "LISTO PARA RECOGER",
      helper: "Tu pedido ya esta listo para recoger.",
      icon: faCircleCheck,
      accent: "#10b981",
      banner: "border-emerald-200 bg-emerald-50 text-emerald-700",
      soft: "border-emerald-200 bg-emerald-50 text-emerald-700",
      iconSoft: "bg-emerald-100 text-emerald-600",
      progressTrack: "#d1fae5",
    };
  }

  if (estado === "entregado" || estado === "atendido") {
    return {
      label: "ENTREGADO",
      title: "PEDIDO ENTREGADO",
      helper: "Este pedido ya fue retirado.",
      icon: faTruckFast,
      accent: "#ef4444",
      banner: "border-red-200 bg-red-50 text-red-700",
      soft: "border-red-200 bg-red-50 text-red-700",
      iconSoft: "bg-red-100 text-red-600",
      progressTrack: "#fee2e2",
    };
  }

  return {
    label: "EN ESPERA",
    title: "EN PREPARACION",
    helper: "Tu pedido aun se esta preparando.",
    icon: faClock,
    accent: "#2563eb",
    banner: "border-blue-200 bg-blue-50 text-blue-700",
    soft: "border-blue-200 bg-blue-50 text-blue-700",
    iconSoft: "bg-blue-100 text-blue-600",
    progressTrack: "#dbeafe",
  };
};

const ProgressCircle = ({
  completed,
  total,
  progress,
  status,
  size = "large",
}) => {
  const dimensions =
    size === "small"
      ? "h-[74px] w-[74px] p-1.5"
      : "h-[104px] w-[104px] p-2 sm:h-[116px] sm:w-[116px]";
  const numberClass =
    size === "small"
      ? "text-xl"
      : "text-3xl sm:text-4xl";

  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full ${dimensions}`}
      style={{
        background: `conic-gradient(${status.accent} ${progress}%, #e2e8f0 0)`,
      }}
    >
      <div
        className="grid h-full w-full place-items-center rounded-full text-center"
        style={{ backgroundColor: status.progressTrack }}
      >
        <div>
          <p
            className={`${numberClass} font-black leading-none`}
            style={{ color: status.accent }}
          >
            {completed}/{total || 0}
          </p>
          <p className="mt-1 text-[9px] font-black text-slate-700 sm:text-xs">
            Fuentes
          </p>
        </div>
      </div>
    </div>
  );
};

export default function PublicClientModal({ client, onClose }) {
  if (!client) return null;

  const status = getStatusConfig(client.estado);
  const fuentesListas = Number(client.fuentesListas || 0);
  const totalFuentes = Number(client.fuentes || 0);
  const safeTotal = Math.max(totalFuentes, 1);
  const completed = Math.min(fuentesListas, totalFuentes);
  const faltan = Math.max(totalFuentes - fuentesListas, 0);
  const progress = Math.min((completed / safeTotal) * 100, 100);
  const progressText =
    completed === 1
      ? "1 fuente ya salio del horno."
      : `${completed} fuentes ya salieron del horno.`;
  const pendingText =
    faltan > 0
      ? `Faltan ${faltan} fuentes por salir.`
      : "Todas tus fuentes estan listas.";

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-950/40
        p-2
        backdrop-blur-sm
        sm:p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          max-h-[calc(100svh-16px)]
          w-full
          max-w-[440px]
          overflow-y-auto
          rounded-[28px]
          border
          border-white/80
          bg-white
          p-3
          shadow-[0_30px_100px_rgba(15,23,42,0.28)]
          sm:max-h-[calc(100svh-32px)]
          sm:max-w-3xl
          sm:rounded-[34px]
          sm:p-5
        "
      >
        <button
          onClick={onClose}
          className="
            absolute
            right-5
            top-5
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-current
            bg-white/70
            text-slate-600
            transition
            hover:bg-white
          "
          aria-label="Cerrar modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className="grid grid-cols-2 gap-2.5 sm:hidden">
          <div className={`rounded-[22px] border p-3 pr-9 ${status.soft}`}>
            <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em]">
              <FontAwesomeIcon icon={status.icon} />
              Estado
            </div>
            <h2 className="mt-2 text-lg font-black leading-tight">
              {status.label}
            </h2>
            <p className="mt-1 text-[11px] font-semibold text-slate-600">
              {status.helper}
            </p>
          </div>

          <div className={`rounded-[22px] border p-3 ${status.soft}`}>
            <div className="mb-2 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em]">
              <FontAwesomeIcon icon={faBoxOpen} />
              Progreso
            </div>
            <div className="flex items-center gap-2">
              <ProgressCircle
                completed={completed}
                total={totalFuentes}
                progress={progress}
                status={status}
                size="small"
              />
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-900">
                  {completed}/{totalFuentes || 0} listas
                </p>
                <p className="mt-1 text-[11px] font-semibold text-slate-600">
                  {faltan > 0 ? `Faltan ${faltan}` : "Completas"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`relative hidden overflow-hidden rounded-[26px] border p-5 pr-14 sm:block ${status.banner}`}>
          <div className="relative z-10 max-w-[66%]">
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em]">
              <FontAwesomeIcon icon={status.icon} />
              Estado del pedido
            </div>

            <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight">
              {status.title}
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-600">
              {status.helper}
            </p>
          </div>

          <div className="absolute bottom-5 right-5 flex items-center gap-3">
            <div className={`flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${status.iconSoft}`}>
              <FontAwesomeIcon icon={faFire} />
            </div>
            <div
              className="h-16 w-24 rounded-b-[18px] rounded-t-[44px] border-[8px]"
              style={{
                borderColor: status.progressTrack,
                backgroundColor: status.progressTrack,
              }}
            >
              <div
                className="mx-auto mt-6 h-6 w-10 rounded-t-full"
                style={{ backgroundColor: status.accent }}
              />
            </div>
          </div>
        </div>

        <div className={`mt-3 hidden rounded-[26px] border p-5 sm:block ${status.soft}`}>
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em]">
            <FontAwesomeIcon icon={faBoxOpen} />
            Progreso de fuentes
          </div>

          <div className="grid grid-cols-[116px_minmax(0,1fr)] items-center gap-5">
            <ProgressCircle
              completed={completed}
              total={totalFuentes}
              progress={progress}
              status={status}
            />

            <div className="min-w-0">
              <p className="text-lg font-black text-slate-900">
                {progressText}
              </p>

              <p className="mt-1 text-base font-semibold text-slate-600">
                {pendingText}
              </p>

              <div
                className="mt-3 h-3 overflow-hidden rounded-full"
                style={{ backgroundColor: "#e2e8f0" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: status.accent,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 text-center text-[11px] font-bold text-slate-400">
          <span className="h-px w-16 bg-slate-200" />
          Estado al momento de la consulta
          <span className="h-px w-16 bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
