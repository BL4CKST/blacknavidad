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
    return clients.length + 1;
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
<>
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Registar clientes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Agrega aqui un cliente para hornear 
          </p>
        </div>

       
      </div>

      {/* NEXT ID */}
      <div className="mb-6 rounded-3xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-sm font-medium text-blue-600">
          Siguiente ID
        </p>

        <h3 className="mt-2 text-4xl font-black text-blue-700">
          {nextCode}
        </h3>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        {/* NOMBRE */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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
          <label className="mb-2 block text-sm font-semibold text-slate-700">
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
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-3
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

        {/* DEBE */}
        <div className="md:col-span-2">
          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
            <p className="text-sm font-medium text-orange-700">
              Falta cancelar
            </p>

            <h3 className="mt-2 text-3xl font-black text-orange-600">
              S/ {debe}
            </h3>
          </div>
        </div>

        {/* BOTON */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="
              w-full
              rounded-3xl
              bg-blue-600
              px-6
              py-4
              text-lg
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
    </>
  );
}