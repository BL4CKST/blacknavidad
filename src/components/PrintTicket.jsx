export default function PrintTicket({
  client,
}) {
  return (
    <div
  id="ticket-print"
  style={{
    height: "auto",
  }}
>
      <div className="w-[80mm] p-4 text-black">
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-lg font-bold">
            INV MOISES
          </h1>

          <p className="mt-1 text-sm">
            Servicio de Asados
          </p>

          <p className="text-sm">
            Edición Fin de Año
          </p>
        </div>

        {/* LINEA */}
        <div className="my-4 border-t border-dashed border-black" />

        {/* ID GRANDE */}
        <div className="text-center">
          <p className="text-xl font-bold">
            ID
          </p>

          <h2 className="mt-1 text-7xl font-black leading-none">
            {client.id}
          </h2>
        </div>

        {/* LINEA */}
        <div className="my-4 border-t border-dashed border-black" />

        {/* INFO */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-3">
            <span className="font-bold">
              Cliente:
            </span>

            <strong className="text-right">
              {client.nombre}
            </strong>
          </div>

          <div className="flex justify-between gap-3">
            <span className="font-bold">
              Contenido:
            </span>

            <strong className="text-right">
              {client.contenido}
            </strong>
          </div>

          <div className="flex justify-between gap-3">
            <span className="font-bold">
              Fuentes:
            </span>

            <strong>
              {client.fuentes}
            </strong>
          </div>

          <div className="flex justify-between gap-3">
            <span className="font-bold">
              Total:
            </span>

            <strong>
              S/{client.total}
            </strong>
          </div>

          <div className="flex justify-between gap-3">
            <span className="font-bold">
              Adelanto:
            </span>

            <strong>
              S/{client.adelanto}
            </strong>
          </div>

          <div className="flex justify-between gap-3 text-lg">
            <span className="font-bold">
              Debe:
            </span>

            <strong className="text-3xl">
              S/{client.debe}
            </strong>
          </div>
        </div>

        {/* LINEA */}
        <div className="my-4 border-t border-dashed border-black" />

        {/* FOOTER */}
        <div className="text-center text-sm">
          <p>
            Gracias por su preferencia
          </p>

          <p className="mt-1">
            ¡Feliz Navidad! 🎄
          </p>
        </div>
      </div>
    </div>
  );
}