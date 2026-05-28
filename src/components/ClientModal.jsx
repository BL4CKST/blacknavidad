import {
  useEffect,
  useState,
} from "react";

import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faPen,
  faPrint,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ClientModal({
  client,
  onClose,
  updateClientStatus,
  updateClient,
  printClientTicket,
}) {
  const [editing, setEditing] =
    useState(false);

  const [formData, setFormData] =
    useState(client);

  useEffect(() => {
    setFormData(client);
  }, [client]);

  if (!client) return null;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    await updateClient(
      client.firebaseId,
      formData
    );

    setEditing(false);
  };

  const handleStatus = async (
    estado
  ) => {
    await updateClientStatus(
      client.firebaseId,
      estado
    );

    onClose();
  };

  const handlePrint = () => {
    printClientTicket(client);
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-3
      "
    >
      <div
        className="
          w-full
          max-w-lg
          overflow-y-auto
          rounded-3xl
          bg-white
          p-5
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">
              {client.id}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Información del pedido
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
            "
          >
            <FontAwesomeIcon
              icon={faXmark}
            />
          </button>
        </div>

        {/* BODY */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Cliente
            </p>

            {editing ? (
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="
                  mt-2
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  outline-none
                "
              />
            ) : (
              <h3 className="mt-2 text-xl font-black text-slate-900">
                {client.nombre}
              </h3>
            )}
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Contenido
            </p>

            <p className="mt-2 font-semibold text-slate-700">
              {client.contenido}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Fuentes
              </p>

              <h3 className="mt-2 text-2xl font-black text-slate-900">
                {client.fuentes}
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Total
              </p>

              <h3 className="mt-2 text-2xl font-black text-emerald-600">
                S/{client.total}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Adelanto
              </p>

              <h3 className="mt-2 text-2xl font-black text-slate-900">
                S/{client.adelanto}
              </h3>
            </div>

            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-orange-400">
                Debe
              </p>

              <h3 className="mt-2 text-3xl font-black text-orange-500">
                S/{client.debe}
              </h3>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              if (editing) {
                handleSave();
              } else {
                setEditing(true);
              }
            }}
            className="
              flex-1
              rounded-2xl
              bg-blue-600
              px-5
              py-4
              text-sm
              font-bold
              text-white
            "
          >
            <FontAwesomeIcon
              icon={faPen}
              className="mr-2"
            />

            {editing
              ? "Guardar"
              : "Editar"}
          </button>

          <button
            onClick={handlePrint}
            className="
              flex-1
              rounded-2xl
              bg-slate-900
              px-5
              py-4
              text-sm
              font-bold
              text-white
            "
          >
            <FontAwesomeIcon
              icon={faPrint}
              className="mr-2"
            />

            Imprimir
          </button>

          {client.estado ===
            "espera" && (
            <button
              onClick={() =>
                handleStatus(
                  "listo"
                )
              }
              className="
                w-full
                rounded-2xl
                bg-emerald-500
                px-5
                py-4
                text-sm
                font-bold
                text-white
              "
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="mr-2"
              />

              Marcar listo
            </button>
          )}

          {client.estado ===
            "listo" && (
            <button
              onClick={() =>
                handleStatus(
                  "entregado"
                )
              }
              className="
                w-full
                rounded-2xl
                bg-orange-500
                px-5
                py-4
                text-sm
                font-bold
                text-white
              "
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="mr-2"
              />

              Marcar entregado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}