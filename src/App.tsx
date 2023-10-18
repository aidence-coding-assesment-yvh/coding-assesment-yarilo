import logo from "./assets/logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import ProviderRequest from "./providers/request";
import { ENDPOINTS } from "./constants";
import User from "./types/User";
import Table from "./components/Table";
import FilterInput from "./components/FilterInput";

const filterUsers = (users: User[], filter: string): User[] => {
  if (!filter) return users;
  return users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(filter.toLowerCase());
    const matchesEmail = user.email
      .toLowerCase()
      .includes(filter.toLowerCase());
    return matchesName || matchesEmail;
  });
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

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

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredUsers = filterUsers(users, filter);
  return (
    <>
      <div className="app">
        <img src={logo} className="logo react" alt="Aidence logo" />
        <div className="content">
          <FilterInput onChange={onChangeFilter} />
          <Table users={filteredUsers} />
          {error ? <p>{error}</p> : null}
        </div>
      </div>
    </>
  );
}

export default App;
