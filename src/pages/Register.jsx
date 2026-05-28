import RegisterClient from "../components/RegisterClient";

export default function Register({
  clients,
  addClient,
}) {
  return (
    <RegisterClient
      clients={clients}
      addClient={addClient}
    />
  );
}