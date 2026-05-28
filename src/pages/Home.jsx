import { useMemo, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHourglassHalf,
  faFire,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className="mb-6">
        <h2 className="text-4xl font-black tracking-tight text-slate-900">
          INICIO
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-600">
          Aqui encontraras el estado actual de los clientes
        </p>
      </div>

      {/* BUSCADOR */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Buscar por ID o nombre..."
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-[#f8fafc]
            px-5
            py-4
            text-sm
            font-medium
            text-slate-900
            outline-none
            transition-all
            duration-200
            placeholder:text-slate-400
            focus:border-cyan-400
          "
        />
      </div>

      {/* COLUMNAS */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* ESPERA */}
        <div className="rounded-[28px] border border-slate-300 bg-[#dbe3ec] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-black text-cyan-700">
              <FontAwesomeIcon
                icon={faHourglassHalf}
              />
              EN ESPERA
            </h3>

            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-cyan-700">
              {esperaClients.length}
            </span>
          </div>

          <div className="space-y-3">
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
        <div className="rounded-[28px] border border-slate-300 bg-[#dbe3ec] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-black text-emerald-700">
              <FontAwesomeIcon
                icon={faFire}
              />
              LISTO
            </h3>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
              {listoClients.length}
            </span>
          </div>

          <div className="space-y-3">
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
        <div className="rounded-[28px] border border-slate-300 bg-[#dbe3ec] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-black text-orange-700">
              <FontAwesomeIcon
                icon={faCircleCheck}
              />
              ATENDIDO
            </h3>

            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">
              {atendidoClients.length}
            </span>
          </div>

          <div className="space-y-3">
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