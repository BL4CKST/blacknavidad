import { useMemo, useState } from "react";

import ClientCard from "../components/ClientCard";
import ClientModal from "../components/ClientModal";

export default function ConsultClients({
  clients,
  updateClientStatus,
  updateClient,
}) {
  const [search, setSearch] =
    useState("");

  const [selectedClient, setSelectedClient] =
    useState(null);

  // FILTRAR CLIENTES
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const term =
        search.toLowerCase();

      return (
        client.nombre
          .toLowerCase()
          .includes(term) ||
        client.id
          .toLowerCase()
          .includes(term) ||
        client.contenido
          .toLowerCase()
          .includes(term)
      );
    });
  }, [search, clients]);

  return (
    <>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Consultar Clientes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Historial completo de pedidos
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          {filteredClients.length} clientes
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre, ID o contenido..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            px-5
            py-4
            text-slate-900
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-blue-300
            focus:bg-white
            focus:ring-4
            focus:ring-blue-100
          "
        />
      </div>

      {/* GRID */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onClick={() =>
              setSelectedClient(client)
            }
          />
        ))}
      </div>

      {/* EMPTY */}
      {filteredClients.length === 0 && (
        <div
          className="
            mt-10
            rounded-3xl
            border
            border-slate-200
            bg-slate-50
            p-10
            text-center
          "
        >
          <h3 className="text-2xl font-black text-slate-700">
            No se encontraron clientes
          </h3>

          <p className="mt-2 text-slate-500">
            Intenta con otro término de búsqueda
          </p>
        </div>
      )}

      {/* MODAL */}
      <ClientModal
        client={selectedClient}
        onClose={() =>
          setSelectedClient(null)
        }
        updateClientStatus={
          updateClientStatus
        }
        updateClient={updateClient}
      />
    </>
  );
}