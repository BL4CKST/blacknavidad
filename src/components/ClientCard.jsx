import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function ClientCard({
  client,
  onClick,
}) {
  const sendWhatsApp = () => {
    const message =
`Hola ${client.nombre};

Ya puedes venir a recoger lo que mandó a hornear con nosotros.

ID de espera: ${client.id}

N. de fuentes: ${client.fuentes}

Monto total:
S/${client.total}

Adelanto:
S/${client.adelanto}

Debe:
S/${client.debe}

Gracias por su preferencia.
¡Feliz Navidad!`;

    window.open(
      `https://wa.me/${client.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div
    onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
      "
    >
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold text-slate-400">
            {client.id}
          </p>

          <h3 className="mt-0.5 text-base font-black text-slate-900">
            {client.nombre}
          </h3>
        </div>

        <button
          onClick={sendWhatsApp}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-green-100
            text-sm
            text-green-600
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </button>
      </div>

      {/* INFO */}
      <div className="mt-3">
        <p className="text-sm font-medium text-slate-700">
          {client.contenido}
        </p>

        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {client.fuentes} fuentes
          </span>

          <h4 className="text-xl font-black text-slate-900">
            S/{client.total}
          </h4>
        </div>
      </div>
    </div>
  );
}