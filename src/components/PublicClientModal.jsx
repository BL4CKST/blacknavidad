import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faCircleInfo,
  faClock,
  faHandHoldingDollar,
  faTruckFast,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const formatMoney = (value) => {
  const number = Number(value || 0);
  return `S/${number}`;
};

const getStatusConfig = (estado) => {
  if (estado === "listo") {
    return {
      label: "LISTO PARA RECOGER",
      icon: faCircleCheck,
      wrap: "border-emerald-200 bg-emerald-50 text-emerald-700",
      helper: "Tu pedido ya está disponible.",
    };
  }

  if (estado === "entregado" || estado === "atendido") {
    return {
      label: "PEDIDO ENTREGADO",
      icon: faTruckFast,
      wrap: "border-red-200 bg-red-50 text-red-700",
      helper: "Este pedido ya fue retirado.",
    };
  }

  return {
    label: "EN ESPERA",
    icon: faClock,
    wrap: "border-blue-200 bg-blue-50 text-blue-700",
    helper: "Tu pedido aún se está preparando.",
  };
};

const Field = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-2.5 sm:p-3">
    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-[11px]">
      {label}
    </p>

    <p className="mt-1 break-words text-sm font-bold text-slate-900">
      {value || "-"}
    </p>
  </div>
);

export default function PublicClientModal({ client, onClose }) {
  if (!client) return null;

  const status = getStatusConfig(client.estado);
  const debe = Number(client.debe || 0);
  const cancelado = debe <= 0;
  const fuentesListas = Number(client.fuentesListas || 0);
  const totalFuentes = Number(client.fuentes || 0);
  const faltan = totalFuentes - fuentesListas;

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
        bg-slate-950/35
        p-2
        backdrop-blur-sm
        sm:p-3
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-[390px]
          overflow-hidden
          rounded-[24px]
          border
          border-white/70
          bg-white
          shadow-[0_30px_100px_rgba(15,23,42,0.25)]
          sm:max-w-xl
          sm:rounded-[26px]
        "
      >
        <div className="p-3 sm:p-4">
          <div className={`relative rounded-[20px] border p-3 pr-11 sm:rounded-[22px] ${status.wrap}`}>
            <button
              onClick={onClose}
              className="
                absolute
                right-3
                top-3
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-current
                bg-transparent
                text-current
                opacity-70
                transition
                hover:opacity-100
              "
              aria-label="Cerrar modal"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>

            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] sm:text-[11px]">
              <FontAwesomeIcon icon={status.icon} className="text-[12px]" />
              Estado del pedido
            </div>

            <h2 className="mt-2 text-lg font-black tracking-tight sm:text-2xl">
              {status.label}
            </h2>

            <p className="mt-1.5 max-w-xl text-xs font-medium text-slate-600 sm:text-sm">
              {status.helper}
            </p>
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-blue-200 bg-blue-50 p-3 text-blue-700 sm:col-span-2 sm:rounded-[22px]">
              <div className="inline-flex items-center gap-2 text-blue-700">
                <FontAwesomeIcon icon={faCircleInfo} />

                <p className="text-[10px] font-black uppercase tracking-[0.18em] sm:text-[11px]">
                  Producción
                </p>
              </div>

              <p className="mt-2 text-base font-black text-blue-700 sm:text-lg">
                {fuentesListas} / {totalFuentes} fuentes listas
              </p>

              {fuentesListas < totalFuentes && (
                <p className="mt-1.5 text-xs text-blue-600 sm:text-sm">
                  Faltan {faltan} fuentes por salir del horno
                </p>
              )}
            </div>

            <Field label="Cliente" value={client.nombre} />
            <Field label="Contenido" value={client.contenido} />
            <Field label="Fuentes" value={`${client.fuentes ?? 0} fuentes`} />
            <Field label="Total" value={formatMoney(client.total)} />
            <Field label="Adelanto" value={formatMoney(client.adelanto)} />
          </div>

          <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-2">
            <div className="rounded-[20px] border border-orange-200 bg-orange-50 p-3 sm:rounded-[22px]">
              <div className="flex items-center gap-2 text-orange-700">
                <FontAwesomeIcon icon={faHandHoldingDollar} />

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]">
                  Debe
                </p>
              </div>

              <p className="mt-1.5 text-2xl font-black text-orange-600 sm:text-3xl">
                {cancelado ? "CANCELADO" : formatMoney(debe)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
