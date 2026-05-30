import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firestore";

const clientsRef = collection(db, "clients");

const normalizeCode = (code = "") => {
  const raw = String(code).trim().toUpperCase();

  if (!raw) return "";
  if (/^C-\d+$/.test(raw)) return raw;
  if (/^C\d+$/.test(raw)) return `C-${raw.slice(1)}`;
  if (/^\d+$/.test(raw)) return `C-${raw}`;

  return raw.replace(/\s+/g, "");
};

// TIEMPO REAL
export const listenClients = (callback) => {
  const q = query(clientsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const clients = snapshot.docs.map((docSnap) => ({
      firebaseId: docSnap.id,
      ...docSnap.data(),
    }));

    callback(clients);
  });
};

// CONSULTA PUBLICA POR ID
export const getClientByCode = async (code) => {
  const normalized = normalizeCode(code);

  if (!normalized) return null;

  const q = query(
    clientsRef,
    where("id", "==", normalized),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const docSnap = snapshot.docs[0];

  return {
    firebaseId: docSnap.id,
    ...docSnap.data(),
  };
};

// CREAR
export const createClient = async (client) => {
  await addDoc(clientsRef, {
    ...client,
    fuentesListas: 0,
    createdAt: serverTimestamp(),
  });
};

// EDITAR
export const editClient = async (firebaseId, data) => {
  const clientDoc = doc(db, "clients", firebaseId);

  await updateDoc(clientDoc, data);
};

// ESTADO
export const updateClientState = async (firebaseId, estado) => {
  const clientDoc = doc(db, "clients", firebaseId);

  await updateDoc(clientDoc, {
    estado,
  });
};

// ACTUALIZAR FUENTES
export const updateFuentes = async (
  firebaseId,
  fuentesListas,
  totalFuentes
) => {
  const clientDoc = doc(db, "clients", firebaseId);

  const estado = fuentesListas >= totalFuentes ? "listo" : "espera";

  await updateDoc(clientDoc, {
    fuentesListas,
    estado,
  });
};
