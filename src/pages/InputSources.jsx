import { useMemo, useState } from "react";

export default function InputSources({
  clients,
  updateFuentes,
}) {
  const [search, setSearch] =
    useState("");

  const sourceClients =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase();

      return clients
        .filter(
          (client) =>
            client.estado ===
              "espera" ||
            client.estado ===
              "listo"
        )
        .filter((client) => {
          if (!normalizedSearch)
            return true;

          return String(client.id || "")
            .toLowerCase()
            .includes(normalizedSearch);
        })
        .sort((a, b) => {
          const aCompleted =
            (a.fuentesListas ?? 0) >=
            a.fuentes;

          const bCompleted =
            (b.fuentesListas ?? 0) >=
            b.fuentes;

          return (
            Number(aCompleted) -
            Number(bCompleted)
          );
        });
    }, [clients, search]);

  const [changes, setChanges] =
    useState({});

  const [confirm, setConfirm] =
    useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleAdd = (client) => {
    const current =
      changes[client.id] ??
      client.fuentesListas ??
      0;

    if (current >= client.fuentes)
      return;

    setChanges({
      ...changes,
      [client.id]:
        current + 1,
    });
  };

  const handleRemove = (
    client
  ) => {
    const current =
      changes[client.id] ??
      client.fuentesListas ??
      0;

    if (current <= 0) return;

    setChanges({
      ...changes,
      [client.id]:
        current - 1,
    });
  };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    setSaveError("");
    try {
      for (const client of sourceClients) {
        const value = changes[client.id];
        if (value === undefined) continue;
        await updateFuentes(client.id, value, client.fuentes);
        setChanges((current) => {
          const remaining = { ...current };
          delete remaining[client.id];
          return remaining;
        });
      }
      setConfirm(false);
      setChanges({});
    } catch {
      setSaveError("No se pudieron guardar todos los cambios. Revisa los pendientes.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      {/* HEADER */}
      <div className="mb-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            INGRESAR
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Registra las fuentes que salen
            del horno.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm">
          <label className="mb-1 block px-1 text-xs font-bold text-slate-700">
            Buscar ID
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="C-1"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              font-bold
              uppercase
              text-slate-900
              outline-none
              placeholder:text-slate-400
              focus:border-orange-300
              focus:bg-white
              focus:ring-4
              focus:ring-orange-100
            "
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sourceClients.map(
          (client) => {
            const listas =
              changes[
                client.id
              ] ??
              client.fuentesListas ??
              0;

            const completed =
              listas >=
              client.fuentes;

            return (
              <div
                key={
                  client.id
                }
                className={`
                  rounded-2xl
                  border
                  p-4
                  shadow-sm
                  transition-all

                  ${
                    completed
                      ? "border-green-300 bg-green-50"
                      : "border-slate-200 bg-white"
                  }
                `}
              >
                {/* COMPLETADO */}
                {completed && (
                  <div
                    className="
                      mb-3
                      inline-flex
                      items-center
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-black
                      text-green-700
                    "
                  >
                    ✓ COMPLETADO
                  </div>
                )}

                {/* TOP */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {client.id}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {
                        client.fuentes
                      }{" "}
                      fuentes
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleRemove(
                          client
                        )
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-slate-200
                        text-lg
                        font-black
                        text-slate-700
                      "
                    >
                      -
                    </button>

                    <button
                      onClick={() =>
                        handleAdd(
                          client
                        )
                      }
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-500
                        text-lg
                        font-black
                        text-white
                      "
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* STATUS */}
                <div className="mt-4">
                  <p
                    className={`
                      text-base
                      font-black

                      ${
                        completed
                          ? "text-green-600"
                          : listas > 0
                          ? "text-orange-500"
                          : "text-blue-600"
                      }
                    `}
                  >
                    {listas} /{" "}
                    {
                      client.fuentes
                    }{" "}
                    fuentes
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* BOTON */}
      {Object.keys(changes)
        .length > 0 && (
        <div className="mt-8">
          <button
            onClick={() =>
              setConfirm(true)
            }
            className="
              w-full
              rounded-3xl
              bg-orange-500
              px-6
              py-4
              text-lg
              font-black
              text-white
            "
          >
            Guardar cambios
          </button>
        </div>
      )}

      {/* CONFIRM */}
      {confirm && (
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
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              p-6
            "
          >
            <h3 className="text-2xl font-black text-slate-900">
              Confirmación
            </h3>

            <p className="mt-3 text-slate-600">
              ¿Seguro que deseas
              actualizar las fuentes
              listas?
            </p>

            {saveError && <p role="alert" className="mt-3 text-sm text-red-700">{saveError}</p>}
            <div className="mt-6 flex gap-3">
              <button
                disabled={saving}
                onClick={() =>
                  setConfirm(false)
                }
                className="
                  flex-1
                  rounded-2xl
                  bg-slate-100
                  px-5
                  py-3
                  font-bold
                  text-slate-700
                "
              >
                Cancelar
              </button>

              <button
                disabled={saving}
                onClick={
                  handleSave
                }
                className="
                  flex-1
                  rounded-2xl
                  bg-orange-500
                  px-5
                  py-3
                  font-bold
                  text-white
                "
              >
                {saving ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
