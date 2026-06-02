import { useEffect, useRef, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faChevronDown,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./layout/Sidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InputSources from "./pages/InputSources";
import Accounting from "./pages/Accounting";
import PublicHome from "./pages/PublicHome";
import DeleteClients from "./pages/DeleteClients";

import { auth } from "./firebase/auth";
import {
  createClient,
  deleteClient as deleteClientFirestore,
  editClient,
  listenClients,
  updateClientState,
  updateFuentes as updateFuentesFirestore,
} from "./firebase/clients";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const buildPrintHTML = (client) => {
  const printedAt = new Date();
  const date = printedAt.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const time = printedAt.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ticket</title>

        <style>
          @page {
            size: 80mm auto;
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            width: 80mm;
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: white;
            color: #000;
          }

          body {
            padding: 8px 10px 10px;
          }

          .center {
            text-align: center;
          }

          .line {
            border-top: 1px dashed #000;
            margin: 8px 0;
          }

          .solid {
            border-top: 2px solid #000;
            margin: 8px 0;
          }

          .brand {
            margin: 0;
            font-size: 20px;
            font-weight: 900;
            letter-spacing: 0.5px;
          }

          .doc-title {
            display: inline-block;
            margin: 8px 0 6px;
            border: 1px solid #000;
            padding: 3px 10px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 1px;
          }

          .sub {
            margin: 2px 0;
            font-size: 11px;
            font-weight: 700;
          }

          .meta {
            border: 1px solid #000;
            padding: 5px;
            margin-top: 8px;
            font-size: 9.5px;
            font-weight: 800;
            line-height: 1.35;
            text-align: center;
          }

          .url {
            display: block;
            margin-top: 2px;
            font-size: 10px;
            font-weight: 900;
          }

          .id-label {
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1px;
          }

          .id {
            font-size: 46px;
            font-weight: 900;
            line-height: 1;
            margin: 5px 0 2px;
          }

          .row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 6px;
            font-size: 11px;
            gap: 8px;
          }

          .label {
            min-width: 26mm;
            font-weight: 900;
          }

          .value {
            flex: 1;
            text-align: right;
            font-weight: 800;
            word-break: break-word;
          }

          .money-row {
            font-size: 12px;
          }

          .total-due {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 7px 0;
          }

          .due-label {
            font-size: 13px;
            font-weight: 900;
          }

          .debe {
            font-size: 26px;
            font-weight: 900;
          }

          .footer-date {
            margin-top: 8px;
            font-size: 10px;
            font-weight: 700;
          }

          .thanks {
            margin-top: 6px;
            font-size: 11px;
            font-weight: 900;
          }
        </style>
      </head>

      <body>
        <div class="center">
          <h1 class="brand">INV MOISES</h1>
          <div class="doc-title">NOTA DE VENTA</div>

          <p class="sub">
            Servicio de Asados
          </p>

          <p class="sub">
            Campana Fin de Ano 2026
          </p>
        </div>

        <div class="meta">
          Consulta el estado de tus fuentes con este codigo en
          <span class="url">https://blacknavidad.vercel.app/</span>
        </div>

        <div class="solid"></div>

        <div class="center">
          <div class="id-label">CODIGO DE PEDIDO</div>

          <div class="id">
            ${escapeHtml(client.id)}
          </div>
        </div>

        <div class="line"></div>

        <div class="row">
          <span class="label">Cliente</span>
          <span class="value">${escapeHtml(client.nombre)}</span>
        </div>

        <div class="row">
          <span class="label">Contenido</span>
          <span class="value">${escapeHtml(client.contenido)}</span>
        </div>

        <div class="row">
          <span class="label">Fuentes</span>
          <span class="value">${escapeHtml(client.fuentes)}</span>
        </div>

        <div class="line"></div>

        <div class="row money-row">
          <span class="label">Total</span>
          <span class="value">S/ ${escapeHtml(client.total)}</span>
        </div>

        <div class="row money-row">
          <span class="label">Adelanto</span>
          <span class="value">S/ ${escapeHtml(client.adelanto)}</span>
        </div>

        <div class="total-due">
          <span class="due-label">SALDO</span>
          <span class="debe">S/ ${escapeHtml(client.debe)}</span>
        </div>

        <div class="center footer-date">
          Emitido: ${escapeHtml(date)} - ${escapeHtml(time)}
        </div>

        <div class="center thanks">
          Gracias por su preferencia
        </div>
      </body>
    </html>
  `;
};

const printClientTicket = (client) => {
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;

  doc.open();
  doc.write(buildPrintHTML(client));
  doc.close();

  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }, 300);
  };
};

export default function App() {
  const [view, setView] = useState("public");
  const [page, setPage] = useState("home");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        setView("admin");
      } else if (view !== "login") {
        setView("public");
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = listenClients((data) => {
      setClients(data);
    });

    return unsubscribe;
  }, [isAuthenticated]);

  if (loading) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-[#eef4fb]">
        <div className="text-lg font-bold text-slate-900">Cargando...</div>
      </main>
    );
  }

  const addClient = async (newClient) => {
    await createClient(newClient);
    setPage("home");
    printClientTicket(newClient);
  };

  const updateClientStatus = async (firebaseId, estado) => {
    await updateClientState(firebaseId, estado);
  };

  const updateClient = async (firebaseId, data) => {
    await editClient(firebaseId, data);
  };

  const deleteClient = async (firebaseId) => {
    await deleteClientFirestore(firebaseId);
  };

  const updateFuentes = async (firebaseId, fuentesListas, totalFuentes) => {
    await updateFuentesFirestore(firebaseId, fuentesListas, totalFuentes);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setPage("home");
    setView("public");
    setUserMenu(false);
  };

  if (!isAuthenticated && view === "login") {
    return (
      <Login
        setIsAuthenticated={setIsAuthenticated}
        onBackToPublic={() => setView("public")}
        onLoginSuccess={() => setView("admin")}
      />
    );
  }

  if (!isAuthenticated) {
    return <PublicHome onLogin={() => setView("login")} />;
  }

  return (
    <main className="min-h-[100svh] bg-[#dfe7f1] p-3 md:p-5">
      <div className="mx-auto max-w-[1600px]">
        <div ref={menuRef} className="relative z-30 mb-5">
          <header className="flex items-center justify-between gap-3 rounded-[28px] border border-white/80 bg-white/85 px-4 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl">
            <div className="flex min-w-0 items-center gap-3">
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="
                    hidden
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    shadow-sm
                    transition
                    hover:border-slate-300
                    hover:shadow-md
                    md:flex
                  "
                  aria-label="Mostrar menú"
                  title="Mostrar menú"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              )}

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white shadow-lg shadow-slate-900/20">
                IM
              </div>

              <div className="min-w-0 leading-none">
                <p className="truncate text-[12px] font-black uppercase tracking-[0.28em] text-slate-400">
                  Inv. Moisés
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                  Panel administrador
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:px-4"
                aria-label="Abrir menú de usuario"
                aria-expanded={userMenu}
              >
                <FontAwesomeIcon icon={faUser} className="text-slate-700" />
                <span className="hidden sm:inline">Cuenta</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-xs text-slate-400 transition ${userMenu ? "rotate-180" : ""}`}
                />
              </button>

              {userMenu && (
                <div className="absolute right-0 mt-3 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.18)]">
                  <div className="border-b border-slate-100 p-4">
                    <p className="text-sm font-black text-slate-900">INV. MOISES</p>
                    <p className="text-xs font-semibold text-slate-500">
                      Sucursal Principal
                    </p>
                    <p className="mt-3 break-all rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                      {currentUser?.email || "Sin correo registrado"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-4 text-sm font-bold text-red-500 transition hover:bg-red-50"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </header>
        </div>

        <div
          className={`
            relative
            grid
            gap-5
            transition-all
            duration-300
            ${
              sidebarCollapsed
                ? "md:grid-cols-[minmax(0,1fr)]"
                : "md:grid-cols-[240px_minmax(0,1fr)]"
            }
          `}
        >
          {!sidebarCollapsed && (
            <Sidebar
              page={page}
              setPage={setPage}
              handleLogout={handleLogout}
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />
          )}

          <section className="relative w-full min-w-0 rounded-3xl border border-[#cfd8e3] bg-[#f3f7fb] p-4 md:p-5">
            {page === "home" && (
              <Home
                clients={clients}
                updateClientStatus={updateClientStatus}
                updateClient={updateClient}
                printClientTicket={printClientTicket}
              />
            )}

            {page === "register" && <Register clients={clients} addClient={addClient} />}

            {page === "fuentes" && (
              <InputSources clients={clients} updateFuentes={updateFuentes} />
            )}

            {page === "accounting" && <Accounting clients={clients} />}

            {page === "delete" && (
              <DeleteClients clients={clients} deleteClient={deleteClient} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
