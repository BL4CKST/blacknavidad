import { useEffect, useRef, useState } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronDown,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Sidebar from "./layout/Sidebar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InputSources from "./pages/InputSources";
import PublicHome from "./pages/PublicHome";

import { auth } from "./firebase/auth";
import {
  createClient,
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
            font-family: Arial, sans-serif;
            background: white;
          }

          body {
            padding: 10px;
          }

          .center {
            text-align: center;
          }

          .line {
            border-top: 1px dashed black;
            margin: 10px 0;
          }

          .id {
            font-size: 60px;
            font-weight: 900;
            line-height: 1;
            margin: 10px 0;
          }

          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
            gap: 10px;
          }

          .bold {
            font-weight: bold;
          }

          .debe {
            font-size: 24px;
            font-weight: 900;
          }
        </style>
      </head>

      <body>
        <div class="center">
          <h2>INV MOISES</h2>

          <p>
            Servicio de Asados
          </p>

          <p>
            Edición Fin de Año
          </p>
        </div>

        <div class="line"></div>

        <div class="center">
          <div>ID</div>

          <div class="id">
            ${escapeHtml(client.id)}
          </div>
        </div>

        <div class="line"></div>

        <div class="row">
          <span class="bold">Cliente:</span>
          <span class="bold">${escapeHtml(client.nombre)}</span>
        </div>

        <div class="row">
          <span class="bold">Contenido:</span>
          <span class="bold">${escapeHtml(client.contenido)}</span>
        </div>

        <div class="row">
          <span class="bold">Fuentes:</span>
          <span class="bold">${escapeHtml(client.fuentes)}</span>
        </div>

        <div class="row">
          <span class="bold">Total:</span>
          <span class="bold">S/${escapeHtml(client.total)}</span>
        </div>

        <div class="row">
          <span class="bold">Adelanto:</span>
          <span class="bold">S/${escapeHtml(client.adelanto)}</span>
        </div>

        <div class="row">
          <span class="bold">Debe:</span>
          <span class="debe">S/${escapeHtml(client.debe)}</span>
        </div>

        <div class="line"></div>

        <div class="center">
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
      <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-[280px_1fr]">
        <Sidebar page={page} setPage={setPage} handleLogout={handleLogout} />

        <section className="relative rounded-3xl border border-[#cfd8e3] bg-[#f3f7fb] p-4 md:p-5">
          <div ref={menuRef} className="absolute right-4 top-4 z-30">
            <button
              onClick={() => setUserMenu(!userMenu)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div className="hidden text-left md:block">
                <p className="text-sm font-black text-slate-900">INV. MOISES</p>
                <p className="text-xs font-medium text-slate-500">Sucursal Principal</p>
              </div>

              <FontAwesomeIcon icon={faChevronDown} className="text-xs text-slate-400" />
            </button>

            {userMenu && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 p-4">
                  <p className="text-sm font-black text-slate-900">INV. MOISES</p>
                  <p className="mt-1 text-xs text-slate-500">{currentUser?.email}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-4 text-sm font-bold text-red-500"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {page === "home" && (
            <Home
              clients={clients}
              updateClientStatus={updateClientStatus}
              updateClient={updateClient}
              printClientTicket={printClientTicket}
            />
          )}

          {page === "register" && <Register clients={clients} addClient={addClient} />}

          {page === "fuentes" && <InputSources clients={clients} updateFuentes={updateFuentes} />}
        </section>
      </div>
    </main>
  );
}
