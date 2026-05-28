import { useMemo, useState } from "react";

import ClientCard from "../components/ClientCard";
import ClientModal from "../components/ClientModal";

import {
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

import {
  faHourglassHalf,
  faFire,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function Home({
  clients,
  updateClientStatus,
  updateClient,
  printClientTicket,
}) {
  const [search, setSearch] =
    useState("");

  const [selectedClient, setSelectedClient] =
    useState(null);

  const filteredClients =
    useMemo(() => {
      return clients.filter(
        (client) => {
          const text = `
            ${client.id}
            ${client.nombre}
          `.toLowerCase();

          return text.includes(
            search.toLowerCase()
          );
        }
      );
    }, [clients, search]);

  const waiting =
    filteredClients.filter(
      (client) =>
        client.estado === "espera"
    );

  const ready =
    filteredClients.filter(
      (client) =>
        client.estado === "listo"
    );

  const delivered =
    filteredClients.filter(
      (client) =>
        client.estado ===
        "entregado"
    );

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-black text-slate-950">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Gestión premium de pedidos
            navideños
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por ID o nombre..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              rounded-3xl
              border
              border-slate-300
              bg-white
              px-6
              py-4
              text-sm
              font-medium
              outline-none
            "
          />
        </div>

        {/* COLUMNS */}
        <div
          className="
            grid
            gap-5
            xl:grid-cols-3
          "
        >
          {/* ESPERA */}
          <div
            className="
              rounded-3xl
              border
              border-slate-300
              bg-[#cfd5dc]
              p-4
            "
          >
            {/* TITLE */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faHourglassHalf}
                  className="
                    text-lg
                    text-cyan-700
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black
                    text-cyan-700
                  "
                >
                  EN ESPERA
                </h2>
              </div>

              <div
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-200
                  px-2
                  text-sm
                  font-black
                  text-cyan-700
                "
              >
                {waiting.length}
              </div>
            </div>

            {/* CARDS */}
            <div className="space-y-4">
              {waiting.map(
                (client) => (
                  <ClientCard
                    key={
                      client.firebaseId
                    }
                    client={client}
                    onClick={() =>
                      setSelectedClient(
                        client
                      )
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* LISTO */}
          <div
            className="
              rounded-3xl
              border
              border-slate-300
              bg-[#cfd5dc]
              p-4
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faFire}
                  className="
                    text-lg
                    text-emerald-700
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black
                    text-emerald-700
                  "
                >
                  LISTO
                </h2>
              </div>

              <div
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-200
                  px-2
                  text-sm
                  font-black
                  text-emerald-700
                "
              >
                {ready.length}
              </div>
            </div>

            <div className="space-y-4">
              {ready.map(
                (client) => (
                  <ClientCard
                    key={
                      client.firebaseId
                    }
                    client={client}
                    onClick={() =>
                      setSelectedClient(
                        client
                      )
                    }
                  />
                )
              )}
            </div>
          </div>

          {/* ENTREGADO */}
          <div
            className="
              rounded-3xl
              border
              border-slate-300
              bg-[#cfd5dc]
              p-4
            "
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="
                    text-lg
                    text-orange-700
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-black
                    text-orange-700
                  "
                >
                  ATENDIDO
                </h2>
              </div>

              <div
                className="
                  flex
                  h-8
                  min-w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-200
                  px-2
                  text-sm
                  font-black
                  text-orange-700
                "
              >
                {delivered.length}
              </div>
            </div>

            <div className="space-y-4">
              {delivered.map(
                (client) => (
                  <ClientCard
                    key={
                      client.firebaseId
                    }
                    client={client}
                    onClick={() =>
                      setSelectedClient(
                        client
                      )
                    }
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() =>
            setSelectedClient(null)
          }
          updateClientStatus={
            updateClientStatus
          }
          updateClient={updateClient}
          printClientTicket={
            printClientTicket
          }
        />
      )}
    </>
  );
}