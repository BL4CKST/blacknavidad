import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import Sidebar from "./layout/Sidebar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import PrintTicket from "./components/PrintTicket";

import { auth } from "./firebase/auth";

import {
  createClient,
  editClient,
  listenClients,
  updateClientState,
} from "./firebase/clients";

export default function App() {
  const [page, setPage] =
    useState("home");

  const [clients, setClients] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [printClient, setPrintClient] =
    useState(null);

  // AUTH
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          setIsAuthenticated(!!user);

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  // FIRESTORE REALTIME
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe =
      listenClients((data) => {
        setClients(data);
      });

    return unsubscribe;
  }, [isAuthenticated]);

  // LOADING
  if (loading) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-[#eef2f7]">
        <div className="text-lg font-bold text-slate-600">
          Cargando...
        </div>
      </main>
    );
  }

  // LOGIN
  if (!isAuthenticated) {
    return (
      <Login
        setIsAuthenticated={
          setIsAuthenticated
        }
      />
    );
  }

  // AGREGAR CLIENTE
  const addClient = async (
    newClient
  ) => {
    await createClient(newClient);

    // GUARDAR PARA IMPRIMIR
    setPrintClient(newClient);

    // IR A HOME
    setPage("home");

    // IMPRIMIR
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // ESTADO
  const updateClientStatus =
    async (
      firebaseId,
      estado
    ) => {
      await updateClientState(
        firebaseId,
        estado
      );
    };

  // EDITAR
  const updateClient = async (
    firebaseId,
    data
  ) => {
    await editClient(
      firebaseId,
      data
    );
  };

  // LOGOUT
  const handleLogout =
    async () => {
      await signOut(auth);
    };

  return (
    <>
      <main className="min-h-[100svh] bg-transparent p-5">
        <div
          className="
            mx-auto
            grid
            max-w-[1600px]
            gap-5
            md:grid-cols-[280px_1fr]
          "
        >
          {/* SIDEBAR */}
          <Sidebar
            page={page}
            setPage={setPage}
            handleLogout={
              handleLogout
            }
          />

          {/* CONTENT */}
          <section className="relative rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                absolute
                right-5
                top-5
                rounded-2xl
                bg-red-500
                px-4
                py-2
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:bg-red-600
              "
            >
              Salir
            </button>

            {/* HOME */}
            {page === "home" && (
              <Home
                clients={clients}
                updateClientStatus={
                  updateClientStatus
                }
                updateClient={
                  updateClient
                }
              />
            )}

            {/* REGISTER */}
            {page === "register" && (
              <Register
                clients={clients}
                addClient={addClient}
              />
            )}
          </section>
        </div>
      </main>

      {/* PRINT TICKET */}
      {printClient && (
        <div className="print-ticket hidden print:block">
          <PrintTicket
            client={printClient}
          />
        </div>
      )}
    </>
  );
}