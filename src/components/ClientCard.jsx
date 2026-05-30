import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function ClientCard({
  client,
  onClick,
}) {
  const sendWhatsApp = (e) => {
    e.stopPropagation();

    if (!client?.whatsapp) return;

    const message = `Hola ${
      client?.nombre ?? ""
    };

Ya puedes venir a recoger lo que mandó a hornear con nosotros.

ID de espera: ${
      client?.id ?? ""
    }

N. de fuentes: ${
      client?.fuentes ?? ""
    }

Monto total:
S/${
      client?.total ?? ""
    }

Adelanto:
S/${
      client?.adelanto ?? ""
    }

Debe:
S/${
      client?.debe ?? ""
    }

Gracias por su preferencia.
¡Feliz Navidad!`;

    window.open(
      `https://wa.me/${client.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const styles = {
    espera: {
      id: "text-cyan-700",
      shadow: "shadow-cyan-100",
      line: "bg-cyan-500",
    },

    listo: {
      id: "text-emerald-700",
      shadow: "shadow-emerald-100",
      line: "bg-emerald-500",
    },

    atendido: {
      id: "text-orange-700",
      shadow: "shadow-orange-100",
      line: "bg-orange-500",
    },

    entregado: {
      id: "text-orange-700",
      shadow: "shadow-orange-100",
      line: "bg-orange-500",
    },
  };

  const current =
    styles[client?.estado] ?? styles.espera;

  return (
    <div
      onClick={onClick}
      className={`
        relative
        cursor-pointer
        overflow-hidden
        rounded-xl
        border
        border-slate-100
        bg-white
        px-3
        py-2.5
        shadow-sm
        ${current.shadow}
        transition-all
        duration-300
        hover:-translate-y-0.5
      `}
    >
      <div
        className={`
          absolute
          left-0
          top-0
          h-full
          w-[4px]
          ${current.line}
        `}
      />

      {client?.estado === "listo" &&
        client?.whatsapp && (
          <button
            onClick={sendWhatsApp}
            className="
              absolute
              right-2
              top-2
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-green-50
              text-[12px]
              text-green-500
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
            />
          </button>
        )}

      <div className="pl-2">
        <div className="text-center">
          <h2
            className={`
              text-[34px]
              font-black
              leading-none
              tracking-tight
              ${current.id}
            `}
          >
            {client?.id}
          </h2>

          <p className="mt-0.5 truncate text-[13px] font-bold text-slate-700">
            {client?.nombre}
          </p>
        </div>

        <div
          className="
            mt-2
            flex
            items-center
            justify-center
            gap-2
            text-[11px]
            font-bold
          "
        >
          <span className="text-emerald-600">
            Total:
          </span>

          <span className="text-emerald-600">
            S/{client?.total}
          </span>

          <span className="text-slate-300">
            •
          </span>

          <span className="text-orange-500">
            {client?.fuentes} fuentes
          </span>
        </div>
      </div>
    </div>
  );
}
