import User from "../types/User";
import { cloneDeep } from "lodash";
import { Pencil } from "lucide-react";
import "./Table.css";
import { useState } from "react";
import EditableRow from "./EditableRow";

type TableProps = {
  users: User[];
  onConfirmEdit: (user: User) => void;
};

const Table = ({ users }: TableProps) => {
  return (
    <table id="users-table">
      <thead>
        <th>User</th>
        <th>Email</th>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
