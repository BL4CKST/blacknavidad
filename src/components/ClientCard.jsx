import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const formatMoney = (value) => `S/${Number(value || 0)}`;

export default function ClientCard({ client, onClick }) {
  const sendWhatsApp = (e) => {
    e.stopPropagation();

    if (!client?.whatsapp) return;

    const message = `Hola ${client?.nombre ?? ""};

Ya puedes venir a recoger lo que mandó a hornear con nosotros.

ID de espera: ${client?.id ?? ""}

N. de fuentes: ${client?.fuentes ?? ""}

Monto total:
${formatMoney(client?.total)}

Adelanto:
${formatMoney(client?.adelanto)}

Debe:
${formatMoney(client?.debe)}

Gracias por su preferencia.
¡Feliz Navidad!`;

    window.open(
      `https://wa.me/${client.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const styles = {
    espera: {
      id: "text-blue-700",
      line: "bg-blue-500",
      badge: "bg-blue-50 text-blue-700",
      hover: "hover:border-blue-200",
    },
    listo: {
      id: "text-emerald-700",
      line: "bg-emerald-500",
      badge: "bg-emerald-50 text-emerald-700",
      hover: "hover:border-emerald-200",
    },
    atendido: {
      id: "text-red-700",
      line: "bg-red-500",
      badge: "bg-red-50 text-red-700",
      hover: "hover:border-red-200",
    },
    entregado: {
      id: "text-red-700",
      line: "bg-red-500",
      badge: "bg-red-50 text-red-700",
      hover: "hover:border-red-200",
    },
  };

  const current = styles[client?.estado] ?? styles.espera;
  const debe = Number(client?.debe || 0);

  return (
    <article
      onClick={onClick}
      className={`
        relative
        cursor-pointer
        overflow-hidden
        rounded-[18px]
        border
        border-slate-100
        bg-white
        px-3
        py-3
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${current.hover}
      `}
    >
      <div className={`absolute left-0 top-0 h-full w-[4px] ${current.line}`} />

      <div className="flex items-start gap-3 pl-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className={`text-2xl font-black leading-none tracking-tight ${current.id}`}>
              {client?.id}
            </h2>

            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${current.badge}`}>
              {client?.fuentes ?? 0} fuentes
            </span>
          </div>

          <p className="mt-1 truncate text-sm font-semibold text-slate-800">
            {client?.nombre}
          </p>
        </div>

        {client?.estado === "listo" && client?.whatsapp && (
          <button
            onClick={sendWhatsApp}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-green-50
              text-sm
              text-green-500
              transition
              hover:bg-green-100
            "
            aria-label="Enviar WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 pl-2 text-xs font-semibold">
        <span className="text-emerald-700">
          Total: {formatMoney(client?.total)}
        </span>
        <span className="text-slate-300">•</span>
        <span className={debe > 0 ? "text-orange-600" : "text-slate-500"}>
          Debe: {formatMoney(debe)}
        </span>
      </div>
    </article>
  );
}

