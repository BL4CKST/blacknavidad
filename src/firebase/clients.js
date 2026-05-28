import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firestore";

const clientsRef =
  collection(db, "clients");

// TIEMPO REAL
export const listenClients = (
  callback
) => {
  const q = query(
    clientsRef,
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const clients = snapshot.docs.map(
      (doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      })
    );

    callback(clients);
  });
};

// CREAR
export const createClient = async (
  client
) => {
  await addDoc(clientsRef, {
    ...client,
    fuentesListas: 0,
    createdAt: serverTimestamp(),
  });
};

// EDITAR
export const editClient = async (
  firebaseId,
  data
) => {
  const clientDoc = doc(
    db,
    "clients",
    firebaseId
  );

  await updateDoc(clientDoc, data);
};

// ESTADO
export const updateClientState =
  async (
    firebaseId,
    estado
  ) => {
    const clientDoc = doc(
      db,
      "clients",
      firebaseId
    );

    await updateDoc(clientDoc, {
      estado,
    });
  };

// ACTUALIZAR FUENTES
export const updateFuentes =
  async (
    firebaseId,
    fuentesListas,
    totalFuentes
  ) => {
    const clientDoc = doc(
      db,
      "clients",
      firebaseId
    );

    const estado =
      fuentesListas >= totalFuentes
        ? "listo"
        : "espera";

    await updateDoc(clientDoc, {
      fuentesListas,
      estado,
    });
  };