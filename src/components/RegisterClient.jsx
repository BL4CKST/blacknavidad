import { useMemo, useState } from "react";

export default function RegisterClient({
  clients,
  addClient,
}) {
  const [cliente, setCliente] =
    useState({
      nombre: "",
      contenido: "",
      fuentes: "",
      total: "",
      adelanto: "",
      whatsapp: "",
    });

  // SIGUIENTE ID
  const nextId = useMemo(() => {
    const maxId = clients.reduce((max, client) => {
      const value = Number(String(client?.id || "").replace(/\D/g, ""));

      return Number.isFinite(value) && value > max ? value : max;
    }, 0);

    return maxId + 1;
  }, [clients]);

  const nextCode = `C-${nextId}`;

  const debe =
    Number(cliente.total || 0) -
    Number(cliente.adelanto || 0);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: nextCode,

      nombre: cliente.nombre,

      contenido: cliente.contenido,

      fuentes: Number(cliente.fuentes),

      total: Number(cliente.total),

      adelanto: Number(cliente.adelanto),

      debe,

      whatsapp: cliente.whatsapp,

      estado: "espera",
    };

    addClient(newClient);

    setCliente({
      nombre: "",
      contenido: "",
      fuentes: "",
      total: "",
      adelanto: "",
      whatsapp: "",
    });
  };

  return (
    <div className="w-full max-w-6xl">
      {/* HEADER */}
      <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-stretch">
        <div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            REGISTRO
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Agrega aqui un cliente.
          </p>
        </div>

        <div className="min-w-[132px] rounded-2xl border border-blue-100 bg-blue-50 p-3 sm:min-w-[160px]">
          <p className="text-xs font-bold text-blue-600">
            Siguiente ID
          </p>

          <h3 className="mt-1 text-2xl font-black text-blue-700 sm:text-3xl">
            {nextCode}
          </h3>
        </div>

        <div className="min-w-[132px] rounded-2xl border border-orange-100 bg-orange-50 p-3 sm:min-w-[160px]">
          <p className="text-xs font-bold text-orange-700">
            Falta cancelar
          </p>

          <h3 className="mt-1 text-2xl font-black text-orange-600 sm:text-3xl">
            S/ {debe}
          </h3>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
      >
        {/* NOMBRE */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            Nombre del cliente
          </label>

          <input
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            required
            placeholder="Juan Pérez"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* CONTENIDO */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            Contenido
          </label>

          <input
            type="text"
            name="contenido"
            value={cliente.contenido}
            onChange={handleChange}
            required
            placeholder="Pollo, Pavo..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* FUENTES */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            Número de fuentes
          </label>

          <input
            type="number"
            name="fuentes"
            value={cliente.fuentes}
            onChange={handleChange}
            required
            placeholder="2"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* TOTAL */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            Precio total
          </label>

          <input
            type="number"
            name="total"
            value={cliente.total}
            onChange={handleChange}
            required
            placeholder="150"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* ADELANTO */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            Adelanto
          </label>

          <input
            type="number"
            name="adelanto"
            value={cliente.adelanto}
            onChange={handleChange}
            required
            placeholder="50"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* WHATSAPP */}
        <div>
          <label className="mb-1.5 block text-xs font-bold text-slate-700 sm:text-sm">
            WhatsApp
          </label>

          <input
            type="text"
            name="whatsapp"
            value={cliente.whatsapp}
            onChange={handleChange}
            required
            placeholder="51999999999"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-300
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* BOTON */}
        <div className="md:col-span-2 xl:col-span-3">
          <button
            type="submit"
            className="
              mx-auto
              flex
              w-full
              max-w-xs
              items-center
              justify-center
              rounded-2xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-bold
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
            "
          >
            Registrar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
