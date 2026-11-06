import { useMemo, useState } from "react";

import ClientCard from "../components/ClientCard";
import ClientModal from "../components/ClientModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleCheck,
  faFire,
  faHourglassHalf,
  faInbox,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const BoardSummary = ({ label, value, color }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm sm:rounded-[22px] sm:px-4 sm:py-3">
    <p className="truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-[11px] sm:tracking-[0.16em]">
      {label}
    </p>
    <p className={`mt-0.5 text-xl font-extrabold sm:mt-1 sm:text-2xl ${color}`}>
      {value}
    </p>
  </div>
);

const BoardColumn = ({ title, count, icon, tone, children }) => {
  const styles = {
    waiting: {
      wrap: "border-blue-100 bg-blue-50/55",
      title: "text-blue-700",
      count: "bg-blue-100 text-blue-700",
      empty: "text-blue-700",
    },
    ready: {
      wrap: "border-emerald-100 bg-emerald-50/55",
      title: "text-emerald-700",
      count: "bg-emerald-100 text-emerald-700",
      empty: "text-emerald-700",
    },
    delivered: {
      wrap: "border-red-100 bg-red-50/55",
      title: "text-red-700",
      count: "bg-red-100 text-red-700",
      empty: "text-red-700",
    },
  };

  const current = styles[tone];
  const hasItems = count > 0;

  return (
    <section className={`rounded-[28px] border p-4 shadow-sm ${current.wrap}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <FontAwesomeIcon icon={icon} className={`text-lg ${current.title}`} />
          <h2 className={`truncate text-lg font-extrabold ${current.title}`}>
            {title}
          </h2>
        </div>

        <div
          className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-extrabold ${current.count}`}
        >
          {count}
        </div>
      </div>

      <div className="min-h-[160px] space-y-3 md:max-h-[62vh] md:overflow-y-auto md:pr-1 2xl:grid 2xl:grid-cols-2 2xl:gap-3 2xl:space-y-0">
        {hasItems ? (
          children
        ) : (
          <div className="flex min-h-[140px] flex-col items-center justify-center rounded-[22px] border border-dashed border-white bg-white/55 px-4 text-center 2xl:col-span-2">
            <FontAwesomeIcon icon={faInbox} className={`text-2xl ${current.empty}`} />
            <p className="mt-3 text-sm font-semibold text-slate-500">
              No hay pedidos aquí
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default function Home({
  clients,
  updateClientStatus,
  updateClient,
  printClientTicket,
}) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const selectedClient = clients.find((client) => client.id === selectedId);

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const text = `
        ${client?.id ?? ""}
        ${client?.nombre ?? ""}
      `.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [clients, search]);

  const waiting = filteredClients.filter((client) => client?.estado === "espera");
  const ready = filteredClients.filter((client) => client?.estado === "listo");
  const delivered = filteredClients.filter((client) =>
    ["entregado", "atendido"].includes(client?.estado)
  );

  return (
    <>
      <div>
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-950">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Gestión premium de pedidos navideños
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[420px]">
            <BoardSummary label="En espera" value={waiting.length} color="text-blue-700" />
            <BoardSummary label="Listo" value={ready.length} color="text-emerald-700" />
            <BoardSummary label="Entregado" value={delivered.length} color="text-red-700" />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-3 rounded-3xl border border-slate-300 bg-white px-5 shadow-sm focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ID o nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent py-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <BoardColumn
            title="EN ESPERA"
            count={waiting.length}
            icon={faHourglassHalf}
            tone="waiting"
          >
            {waiting.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => setSelectedId(client.id)}
              />
            ))}
          </BoardColumn>

          <BoardColumn
            title="LISTO"
            count={ready.length}
            icon={faFire}
            tone="ready"
          >
            {ready.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => setSelectedId(client.id)}
              />
            ))}
          </BoardColumn>

          <BoardColumn
            title="ENTREGADO"
            count={delivered.length}
            icon={faCircleCheck}
            tone="delivered"
          >
            {delivered.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
                onClick={() => setSelectedId(client.id)}
              />
            ))}
          </BoardColumn>
        </div>
      </div>

      {selectedClient && (
        <ClientModal
          key={selectedId}
          client={selectedClient}
          onClose={() => setSelectedId(null)}
          updateClientStatus={updateClientStatus}
          updateClient={updateClient}
          printClientTicket={printClientTicket}
        />
      )}
    </>
  );
}
