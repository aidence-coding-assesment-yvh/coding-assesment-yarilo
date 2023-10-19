import User from "../types/User";
import { cloneDeep } from "lodash";
import { Pencil } from "lucide-react";
import "./Table.css";
import { useState } from "react";
import EditableRow from "./EditableRow";

type TableProps = {
  users: User[];
  onSaveUser: (user: User) => void;
};

const Table = ({ users, onSaveUser }: TableProps) => {
  const [userToEdit, setUserToEdit] = useState<User | null>();

  const onClickConfirm = (user: User) => {
    setUserToEdit(null); // Close the <EditableRow />
    onSaveUser(user);
  };
  const onClickEdit = (user: User) => {
    setUserToEdit(cloneDeep(user));
  };
  return (
    <table id="users-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th></th>
          {Boolean(userToEdit) ? <th></th> : null}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          if (userToEdit?.id === user.id) {
            return (
              <EditableRow
                user={userToEdit}
                onCancel={() => setUserToEdit(null)}
                onConfirm={(user) => onClickConfirm(user)}
              />
            );
          }
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="edit-icon" onClick={() => onClickEdit(user)}>
                <Pencil />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
