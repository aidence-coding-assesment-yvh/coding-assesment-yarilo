import logo from "./assets/logo.svg";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import ProviderRequest from "./providers/request";
import { ENDPOINTS, LOCAL_STORAGE_USERS_KEY } from "./constants";
import User from "./types/User";
import Table from "./components/Table";
import FilterInput from "./components/FilterInput";
import "./App.css";

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

const saveUsersLocally = (users: User[]) => {
  window.localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};
const fetchUsersLocally = (): User[] | null => {
  const localUsersString = window.localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  if (localUsersString) {
    return JSON.parse(localUsersString);
  }
  return null;
};
const deleteLocalUsers = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_USERS_KEY);
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const localUsers = fetchUsersLocally();
      if (localUsers) {
        setUsers(localUsers);
      } else {
        const users = await ProviderRequest.get(ENDPOINTS.USERS);
        setUsers(users);
      }
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

  const onSaveUser = (userToEdit: User) => {
    // We always clone before modifying the data to:
    // 1. Avoid side effects
    // 2. Makes re-render/prop diff comparison in child components "easier".
    // Related: https://react.dev/learn/tutorial-tic-tac-toe#why-immutability-is-important

    const newUsers: User[] = cloneDeep(users);
    const index = newUsers.findIndex((u) => u.id === userToEdit.id);
    newUsers[index] = userToEdit;
    setUsers(newUsers);
    saveUsersLocally(newUsers);
  };

  const onDeleteUser = (userId: User["id"]) => {
    const newUsers: User[] = cloneDeep(users);
    const index = newUsers.findIndex((u) => u.id === userId);
    newUsers.splice(index, 1);
    setUsers(newUsers);
    saveUsersLocally(newUsers);
  };

  const onClickRestore = async () => {
    deleteLocalUsers();
    await fetchUsers();
  };

  const filteredUsers = filterUsers(users, filter);
  const showRestoreButton = Boolean(fetchUsersLocally());
  return (
    <>
      <div className="app">
        <img src={logo} className="logo react" alt="Aidence logo" />
        <div className="content">
          <FilterInput onChange={onChangeFilter} />
          <Table
            onSaveUser={onSaveUser}
            onDeleteUser={onDeleteUser}
            users={filteredUsers}
          />
          {error ? <p>{error}</p> : null}
        </div>
        {showRestoreButton ? (
          <button className="restore-button" onClick={onClickRestore}>
            Restore default values
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
