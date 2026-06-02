import { useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const normalizeCode = (code = "") => {
  const raw = String(code).trim().toUpperCase();

  if (!raw) return "";
  if (/^C-\d+$/.test(raw)) return raw;
  if (/^C\d+$/.test(raw)) return `C-${raw.slice(1)}`;
  if (/^\d+$/.test(raw)) return `C-${raw}`;

  return raw.replace(/\s+/g, "");
};

const Field = ({ label, value, tone = "slate" }) => {
  const styles = {
    slate: "bg-slate-50 text-slate-900",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-700",
  };

  return (
    <div className={`rounded-2xl p-3 sm:p-4 ${styles[tone]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">
        {label}
      </p>
      <p className="mt-1.5 break-words text-base font-black sm:text-lg">
        {value || "-"}
      </p>
    </div>
  );
};

export default function DeleteClients({
  clients,
  deleteClient,
}) {
  const [code, setCode] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const selectedClient = useMemo(() => {
    const normalized = normalizeCode(code);

    if (!normalized) return null;

    return clients.find((client) => normalizeCode(client.id) === normalized) ?? null;
  }, [clients, code]);

  const hasSearch = normalizeCode(code).length > 0;

  const handleDelete = async () => {
    if (!selectedClient) return;

    setDeleting(true);
    await deleteClient(selectedClient.firebaseId);
    setDeleting(false);
    setConfirmDelete(false);
    setCode("");
  };

  return (
    <>
      <div className="w-full max-w-6xl">
        <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
            <div>
            <h2 className="text-2xl font-black text-slate-900">
              ELIMINAR CLIENTES
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Busca un cliente por ID para revisar sus datos antes de eliminarlo.
            </p>
          </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">
              ID del cliente
            </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 focus-within:border-red-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-red-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-400" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setConfirmDelete(false);
                  }}
                  placeholder="C-1"
                  className="w-full bg-transparent py-2.5 text-sm font-bold uppercase text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        {hasSearch && !selectedClient && (
          <div className="mt-4 max-w-xl rounded-3xl border border-dashed border-red-200 bg-red-50 p-5 text-center">
            <p className="text-sm font-bold text-red-700">
              No se encontro ningun cliente con ese ID.
            </p>
          </div>
        )}

        {selectedClient && (
          <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-3xl font-black text-red-600">
                  {selectedClient.id}
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Informacion del pedido
                </p>
              </div>

              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600">
                {selectedClient.estado || "sin estado"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Cliente" value={selectedClient.nombre} />
              <Field label="Contenido" value={selectedClient.contenido} />
              <Field label="Fuentes" value={selectedClient.fuentes} tone="blue" />
              <Field label="Total" value={`S/${Number(selectedClient.total || 0)}`} tone="green" />
              <Field label="Adelanto" value={`S/${Number(selectedClient.adelanto || 0)}`} />
              <Field label="Debe" value={`S/${Number(selectedClient.debe || 0)}`} tone="orange" />
              <div className="sm:col-span-2">
                <Field label="WhatsApp" value={selectedClient.whatsapp} />
              </div>
            </div>

            <button
              onClick={() => setConfirmDelete(true)}
              className="
                mt-5
                inline-flex
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-black
                text-white
                transition
                hover:bg-red-700
              "
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {confirmDelete && selectedClient && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/30
            p-4
          "
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
            <h3 className="text-2xl font-black text-slate-900">
              Confirmacion
            </h3>

            <p className="mt-3 text-slate-600">
              Seguro que deseas eliminar al cliente {selectedClient.id}?
            </p>

            <p className="mt-2 text-sm font-semibold text-red-600">
              Esta accion quitara el registro del panel.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700"
                disabled={deleting}
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-2xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-70"
                disabled={deleting}
              >
                {deleting ? "Eliminando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
