import { useMemo, useState } from "react";

import ClientCard from "../components/ClientCard";
import ClientModal from "../components/ClientModal";

export default function Home({
  clients,
  updateClientStatus,
  updateClient,
}) {
  const [selectedClient, setSelectedClient] =
    useState(null);

  const [search, setSearch] =
    useState("");

  // FILTRAR
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
          .includes(term)
      );
    });
  }, [clients, search]);

  // ESTADOS
  const esperaClients =
    filteredClients.filter(
      (client) =>
        client.estado === "espera"
    );

  const listoClients =
    filteredClients.filter(
      (client) =>
        client.estado === "listo"
    );

  const atendidoClients =
    filteredClients.filter(
      (client) =>
        client.estado === "atendido"
    );

  return (
    <>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Gestión de pedidos navideños
          </p>
        </div>

       
      </div>

      {/* BUSCADOR */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Buscar por ID, Nombre"
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

      {/* COLUMNAS */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* EN ESPERA */}
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100/40 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-black text-blue-700">
              EN ESPERA
            </h3>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
              {esperaClients.length}
            </span>
          </div>

          <div className="space-y-4">
            {esperaClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() =>
                  setSelectedClient(client)
                }
              />
            ))}
          </div>
        </div>

        {/* LISTO */}
        <div className="rounded-3xl border border-green-100 bg-gradient-to-b from-green-50 to-green-100/40 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-black text-green-700">
              LISTO
            </h3>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              {listoClients.length}
            </span>
          </div>

          <div className="space-y-4">
            {listoClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() =>
                  setSelectedClient(client)
                }
              />
            ))}
          </div>
        </div>

        {/* ATENDIDO */}
        <div className="rounded-3xl border border-red-100 bg-gradient-to-b from-red-50 to-red-100/40 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-black text-red-700">
              ATENDIDO
            </h3>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
              {atendidoClients.length}
            </span>
          </div>

          <div className="space-y-4">
            {atendidoClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() =>
                  setSelectedClient(client)
                }
              />
            ))}
          </div>
        </div>
      </div>

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