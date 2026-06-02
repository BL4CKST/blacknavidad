import { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartPie,
  faCoins,
  faLayerGroup,
  faMoneyBillWave,
  faSackDollar,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const toNumber = (value) => Number(value || 0);

const formatMoney = (value) =>
  `S/${toNumber(value).toLocaleString("es-PE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

const MetricCard = ({ title, value, helper, icon, accent = "slate" }) => {
  const accents = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
    slate: "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {value}
          </p>
          {helper && (
            <p className="mt-2 text-sm font-medium text-slate-500">
              {helper}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${accents[accent]}`}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, value, color }) => (
  <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
    <div className="flex items-center gap-3">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <p className="text-sm font-bold text-slate-700">{label}</p>
    </div>

    <p className="text-sm font-black text-slate-950">{value}</p>
  </div>
);

export default function Accounting({ clients = [] }) {
  const summary = useMemo(() => {
    const totalMoney = clients.reduce(
      (sum, client) => sum + toNumber(client.total),
      0
    );

    const cash = clients.reduce(
      (sum, client) => sum + toNumber(client.adelanto),
      0
    );

    const pending = clients.reduce(
      (sum, client) => sum + toNumber(client.debe),
      0
    );

    const totalFuentes = clients.reduce(
      (sum, client) => sum + toNumber(client.fuentes),
      0
    );

    const waiting = clients.filter((client) => client.estado === "espera").length;
    const ready = clients.filter((client) => client.estado === "listo").length;
    const delivered = clients.filter((client) =>
      ["entregado", "atendido"].includes(client.estado)
    ).length;

    return {
      totalMoney,
      cash,
      pending,
      totalFuentes,
      totalClients: clients.length,
      waiting,
      ready,
      delivered,
    };
  }, [clients]);

  const collectedPercent =
    summary.totalMoney > 0
      ? Math.round((summary.cash / summary.totalMoney) * 100)
      : 0;

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-950">
            Contabilidad
          </h1>
          <p className="mt-2 text-slate-500">
            Resumen financiero de clientes, fuentes y cobros.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
          <FontAwesomeIcon icon={faChartPie} />
          Vista general
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Dinero total"
          value={formatMoney(summary.totalMoney)}
          helper="Suma de todos los pedidos"
          icon={faSackDollar}
          accent="blue"
        />
        <MetricCard
          title="Dinero en caja"
          value={formatMoney(summary.cash)}
          helper="Suma de adelantos"
          icon={faWallet}
          accent="green"
        />
        <MetricCard
          title="Falta por cobrar"
          value={formatMoney(summary.pending)}
          helper="Suma de saldos pendientes"
          icon={faMoneyBillWave}
          accent="orange"
        />
        <MetricCard
          title="Fuentes"
          value={summary.totalFuentes}
          helper="Cantidad total registrada"
          icon={faLayerGroup}
          accent="cyan"
        />
        <MetricCard
          title="Clientes"
          value={summary.totalClients}
          helper="Clientes registrados hasta ahora"
          icon={faUsers}
          accent="slate"
        />
        <MetricCard
          title="Cobrado"
          value={`${collectedPercent}%`}
          helper="Porcentaje recibido del total"
          icon={faCoins}
          accent="green"
        />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_0.85fr]">
        <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Estado de cobro
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Relación entre adelantos y saldos pendientes.
              </p>
            </div>

            <p className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black text-white">
              {collectedPercent}%
            </p>
          </div>

          <div className="h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${Math.min(collectedPercent, 100)}%` }}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                Recibido
              </p>
              <p className="mt-1 text-lg font-black text-emerald-700">
                {formatMoney(summary.cash)}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 px-4 py-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-700">
                Pendiente
              </p>
              <p className="mt-1 text-lg font-black text-orange-700">
                {formatMoney(summary.pending)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-slate-950">
            Pedidos por estado
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Conteo actual del flujo operativo.
          </p>

          <div className="mt-4 space-y-3">
            <StatusRow
              label="En espera"
              value={summary.waiting}
              color="bg-blue-500"
            />
            <StatusRow
              label="Listo"
              value={summary.ready}
              color="bg-emerald-500"
            />
            <StatusRow
              label="Entregado"
              value={summary.delivered}
              color="bg-red-500"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
