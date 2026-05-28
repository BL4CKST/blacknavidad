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
import InputSources from "./pages/InputSources";

import PrintTicket from "./components/PrintTicket";

import { auth } from "./firebase/auth";

import {
  createClient,
  editClient,
  listenClients,
  updateClientState,
  updateFuentes as updateFuentesFirestore,
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
      <main className="flex min-h-[100svh] items-center justify-center bg-[#eef4fb]">
        <div className="text-lg font-bold text-slate-900">
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

    // IMPRIMIR
    setPrintClient(newClient);

    // HOME
    setPage("home");

    // PRINT
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

  // FUENTES
  const updateFuentes =
    async (
      firebaseId,
      fuentesListas,
      totalFuentes
    ) => {
      await updateFuentesFirestore(
        firebaseId,
        fuentesListas,
        totalFuentes
      );
    };

  // LOGOUT
  const handleLogout =
    async () => {
      await signOut(auth);
    };

  return (
    <>
      <main className="min-h-[100svh] bg-[#eef4fb] p-3 md:p-5">
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
          <section
            className="
              relative
              rounded-3xl
              border
              border-[#dbe7f5]
              bg-white
              p-4
              shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              md:p-5
            "
          >
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                absolute
                right-4
                top-4
                z-20
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

            {/* FUENTES */}
            {page === "fuentes" && (
              <InputSources
                clients={clients}
                updateFuentes={
                  updateFuentes
                }
              />
            )}
          </section>
        </div>
      </main>

      {/* PRINT */}
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