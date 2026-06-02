import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCheck,
  faPen,
  faPrint,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ClientModal({
  client,
  onClose,
  updateClientStatus,
  updateClient,
  printClientTicket,
}) {
  const emptyForm = {
    nombre: "",
    contenido: "",
    fuentes: "",
    total: "",
    adelanto: "",
    whatsapp: "",
  };

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(client || emptyForm);
  const [confirmDelivery, setConfirmDelivery] = useState(false);

  useEffect(() => {
    setFormData(client || emptyForm);
    setEditing(false);
    setConfirmDelivery(false);
  }, [client]);

  if (!client) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const total = Number(formData.total || 0);
    const adelanto = Number(formData.adelanto || 0);
    const fuentes = Number(formData.fuentes || 0);

    await updateClient(client.firebaseId, {
      ...formData,
      fuentes,
      total,
      adelanto,
      debe: total - adelanto,
    });

    setEditing(false);
  };

  const canEdit = client.estado === "espera";

  const handleStatus = async (estado) => {
    if (estado === "entregado") {
      const total = Number(client.total || 0);

      await updateClient(client.firebaseId, {
        estado: "entregado",
        adelanto: total,
        debe: 0,
      });

      onClose();
      return;
    }

    await updateClientStatus(client.firebaseId, estado);
    onClose();
  };

  const handlePrint = () => {
    printClientTicket(client);
  };

  const inputClassName = `
    mt-1.5
    w-full
    rounded-xl
    border
    border-slate-200
    bg-white
    px-3
    py-2.5
    text-sm
    outline-none
    focus:border-sky-300
    focus:ring-4
    focus:ring-sky-100
  `;

  return (
    <div
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
        className="
          max-h-[calc(100svh-16px)]
          w-full
          max-w-[430px]
          overflow-y-auto
          rounded-[26px]
          bg-white
          p-3
          shadow-[0_30px_100px_rgba(15,23,42,0.25)]
          sm:max-h-[calc(100svh-24px)]
          sm:max-w-lg
          sm:p-5
        "
      >
        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-5">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-black text-slate-900 sm:text-3xl">
              {client.id}
            </h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
              Información del pedido
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-500
              transition
              hover:bg-slate-200
            "
            aria-label="Cerrar modal"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
              Cliente
            </p>

            {editing ? (
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleChange}
                className={inputClassName}
              />
            ) : (
              <h3 className="mt-1.5 text-lg font-black text-slate-900 sm:text-xl">
                {client.nombre}
              </h3>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
              Contenido
            </p>

            {editing ? (
              <input
                type="text"
                name="contenido"
                value={formData.contenido || ""}
                onChange={handleChange}
                className={inputClassName}
              />
            ) : (
              <p className="mt-1.5 text-sm font-semibold text-slate-700 sm:text-base">
                {client.contenido}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
                Fuentes
              </p>

              {editing ? (
                <input
                  type="number"
                  name="fuentes"
                  value={formData.fuentes || ""}
                  onChange={handleChange}
                  className={inputClassName}
                />
              ) : (
                <h3 className="mt-1.5 text-xl font-black text-slate-900 sm:text-2xl">
                  {client.fuentes}
                </h3>
              )}
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
                Total
              </p>

              {editing ? (
                <input
                  type="number"
                  name="total"
                  value={formData.total || ""}
                  onChange={handleChange}
                  className={inputClassName}
                />
              ) : (
                <h3 className="mt-1.5 text-xl font-black text-emerald-600 sm:text-2xl">
                  S/{client.total}
                </h3>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
                Adelanto
              </p>

              {editing ? (
                <input
                  type="number"
                  name="adelanto"
                  value={formData.adelanto || ""}
                  onChange={handleChange}
                  className={inputClassName}
                />
              ) : (
                <h3 className="mt-1.5 text-xl font-black text-slate-900 sm:text-2xl">
                  S/{client.adelanto}
                </h3>
              )}
            </div>

            <div className="rounded-2xl bg-orange-50 p-3 sm:p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-orange-500 sm:text-xs">
                Debe
              </p>

              <h3 className="mt-1.5 text-2xl font-black text-orange-600 sm:text-3xl">
                S/{Number(formData.total || 0) - Number(formData.adelanto || 0)}
              </h3>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
              WhatsApp
            </p>

            {editing ? (
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ""}
                onChange={handleChange}
                className={inputClassName}
              />
            ) : (
              <h3 className="mt-1.5 text-base font-black text-slate-900 sm:text-lg">
                {client.whatsapp}
              </h3>
            )}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3">
          {canEdit && (
            <button
              onClick={() => {
                if (editing) {
                  handleSave();
                } else {
                  setEditing(true);
                }
              }}
              className="
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-blue-600
                px-4
                py-3
                text-sm
                font-bold
                text-white
                sm:py-4
              "
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              {editing ? "Guardar" : "Editar"}
            </button>
          )}

          <button
            onClick={handlePrint}
            className={`
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-slate-900
              px-4
              py-3
              text-sm
              font-bold
              text-white
              ${canEdit ? "" : "col-span-2"}
              sm:py-4
            `}
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            Imprimir
          </button>

          {client.estado === "listo" && (
            <button
              onClick={() => setConfirmDelivery(true)}
              className="
                col-span-2
                inline-flex
                items-center
                justify-center
                rounded-2xl
                bg-orange-500
                px-4
                py-3
                text-sm
                font-bold
                text-white
                sm:py-4
              "
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Marcar entregado
            </button>
          )}
        </div>
      </div>

      {confirmDelivery && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-black/30
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
              shadow-[0_30px_100px_rgba(15,23,42,0.25)]
            "
          >
            <h3 className="text-2xl font-black text-slate-900">
              Confirmacion
            </h3>

            <p className="mt-3 text-slate-600">
              Seguro que deseas marcar este pedido como entregado?
            </p>

            <p className="mt-2 text-sm font-semibold text-orange-600">
              El debe pasara a S/0 y el adelanto sera igual al total.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelivery(false)}
                className="
                  flex-1
                  rounded-2xl
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
                onClick={() => handleStatus("entregado")}
                className="
                  flex-1
                  rounded-2xl
                  bg-orange-500
                  px-5
                  py-3
                  font-bold
                  text-white
                "
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
