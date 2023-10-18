import logo from "./assets/logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ProviderRequest from "./providers/request";
import { ENDPOINTS } from "./constants";
import User from "./types/User";
import Table from "./components/Table";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const users = await ProviderRequest.get(ENDPOINTS.USERS);
      setUsers(users);
    } catch (error) {
      console.error(`Error trying to fetch users: ${error}`);
      setError(String(error));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="app">
        <img src={logo} className="logo react" alt="Aidence logo" />
        <Table users={users} />
        {error ? <p>{error}</p> : null}
      </div>
    </>
  );
}

export default App;
