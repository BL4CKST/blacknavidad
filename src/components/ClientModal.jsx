import { useEffect, useState } from "react";

import PrintTicket from "./PrintTicket";

export default function ClientModal({
  client,
  onClose,
  updateClientStatus,
  updateClient,
}) {
  const [confirmAction, setConfirmAction] =
    useState(null);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editData, setEditData] =
    useState({
      nombre: "",
      contenido: "",
      fuentes: "",
      total: "",
      adelanto: "",
      whatsapp: "",
    });

  useEffect(() => {
    if (client) {
      setEditData({
        nombre: client.nombre || "",
        contenido:
          client.contenido || "",
        fuentes: client.fuentes || "",
        total: client.total || "",
        adelanto:
          client.adelanto || "",
        whatsapp:
          client.whatsapp || "",
      });
    }
  }, [client]);

  if (!client) return null;

  const debe =
    Number(editData.total || 0) -
    Number(editData.adelanto || 0);

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateClient(client.firebaseId, {
      ...editData,
      fuentes: Number(editData.fuentes),
      total: Number(editData.total),
      adelanto: Number(editData.adelanto),
      debe,
    });

    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

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
        bg-black/40
        p-3
        md:p-4
      "
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          max-h-[95svh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-3xl
          bg-white
          p-5
          shadow-2xl
          md:p-6
        "
      >
        {/* HEADER */}
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-400">
              {client.id}
            </p>

            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={editData.nombre}
                onChange={handleChange}
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  text-2xl
                  font-black
                  text-slate-900
                  outline-none
                "
              />
            ) : (
              <h2
                className="
                  mt-1
                  break-words
                  text-2xl
                  font-black
                  text-slate-900
                  md:text-3xl
                "
              >
                {editData.nombre}
              </h2>
            )}
          </div>

          <button
            type="button"
            onClick={() => onClose()}
            className="
              shrink-0
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-600
            "
          >
            Cerrar
          </button>
        </div>

        {/* INFO */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* CONTENIDO */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 text-sm text-slate-400">
              Contenido
            </p>

            {isEditing ? (
              <input
                type="text"
                name="contenido"
                value={editData.contenido}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  outline-none
                "
              />
            ) : (
              <h3 className="text-lg font-bold text-slate-900">
                {editData.contenido}
              </h3>
            )}
          </div>

          {/* FUENTES */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 text-sm text-slate-400">
              Fuentes
            </p>

            {isEditing ? (
              <input
                type="number"
                name="fuentes"
                value={editData.fuentes}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  outline-none
                "
              />
            ) : (
              <h3 className="text-lg font-bold text-slate-900">
                {editData.fuentes}
              </h3>
            )}
          </div>

          {/* TOTAL */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 text-sm text-slate-400">
              Total
            </p>

            {isEditing ? (
              <input
                type="number"
                name="total"
                value={editData.total}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  outline-none
                "
              />
            ) : (
              <h3 className="text-lg font-bold text-slate-900">
                S/{editData.total}
              </h3>
            )}
          </div>

          {/* ADELANTO */}
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="mb-2 text-sm text-slate-400">
              Adelanto
            </p>

            {isEditing ? (
              <input
                type="number"
                name="adelanto"
                value={editData.adelanto}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  outline-none
                "
              />
            ) : (
              <h3 className="text-lg font-bold text-slate-900">
                S/{editData.adelanto}
              </h3>
            )}
          </div>

          {/* WHATSAPP */}
          <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
            <p className="mb-2 text-sm text-slate-400">
              WhatsApp
            </p>

            {isEditing ? (
              <input
                type="text"
                name="whatsapp"
                value={editData.whatsapp}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  py-2
                  outline-none
                "
              />
            ) : (
              <h3 className="text-lg font-bold text-slate-900">
                {editData.whatsapp}
              </h3>
            )}
          </div>

          {/* DEBE */}
          <div className="rounded-2xl bg-orange-50 p-4 md:col-span-2">
            <p className="text-sm text-orange-600">
              Debe
            </p>

            <h3 className="mt-1 text-3xl font-black text-orange-600">
              S/{debe}
            </h3>
          </div>
        </div>

        {/* BOTONES */}
        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          {/* IMPRIMIR */}
          <button
            onClick={handlePrint}
            className="
              flex-1
              rounded-2xl
              bg-slate-900
              px-5
              py-4
              font-bold
              text-white
            "
          >
            Imprimir
          </button>

          {/* EDITAR */}
          {client.estado === "espera" && (
            <>
              {!isEditing ? (
                <button
                  onClick={() =>
                    setIsEditing(true)
                  }
                  className="
                    flex-1
                    rounded-2xl
                    bg-blue-600
                    px-5
                    py-4
                    font-bold
                    text-white
                  "
                >
                  Editar
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="
                    flex-1
                    rounded-2xl
                    bg-emerald-600
                    px-5
                    py-4
                    font-bold
                    text-white
                  "
                >
                  Guardar
                </button>
              )}
            </>
          )}

          {/* MARCAR LISTO */}
          {client.estado === "espera" && (
            <button
              onClick={() =>
                setConfirmAction("listo")
              }
              className="
                flex-1
                rounded-2xl
                bg-green-600
                px-5
                py-4
                font-bold
                text-white
              "
            >
              Marcar Listo
            </button>
          )}

          {/* ENTREGADO */}
          {client.estado === "listo" && (
            <button
              onClick={() =>
                setConfirmAction(
                  "atendido"
                )
              }
              className="
                flex-1
                rounded-2xl
                bg-red-600
                px-5
                py-4
                font-bold
                text-white
              "
            >
              Entregado
            </button>
          )}
        </div>

        {/* CONFIRMACION */}
        {confirmAction && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              rounded-3xl
              bg-black/20
              p-4
            "
          >
            <div
              className="
                w-full
                max-w-md
                rounded-3xl
                bg-white
                p-6
                shadow-2xl
              "
            >
              <h3 className="text-2xl font-black text-slate-900">
                Confirmación
              </h3>

              <p className="mt-3 text-slate-600">
                {confirmAction ===
                "listo"
                  ? "¿Está seguro de marcar este pedido como LISTO?"
                  : "¿Confirmar entrega del pedido?"}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() =>
                    setConfirmAction(
                      null
                    )
                  }
                  className="
                    flex-1
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-100
                    px-5
                    py-3
                    font-bold
                    text-slate-700
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    updateClientStatus(
                      client.firebaseId,
                      confirmAction
                    );

                    setConfirmAction(
                      null
                    );

                    onClose();
                  }}
                  className={`
                    flex-1
                    rounded-2xl
                    px-5
                    py-3
                    font-bold
                    text-white

                    ${
                      confirmAction ===
                      "listo"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  `}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TICKET SOLO PARA IMPRIMIR */}
        <div className="hidden print:block">
          <PrintTicket
            client={{
              ...client,
              ...editData,
              debe,
            }}
          />
        </div>
      </div>
    </div>
  );
}