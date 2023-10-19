import User from "../types/User";
import { cloneDeep } from "lodash";
import { Pencil } from "lucide-react";
import "./Table.css";
import { useState, Fragment } from "react";
import EditableRow from "./EditableRow";

type TableProps = {
  users: User[];
  onSaveUser: (user: User) => void;
  onDeleteUser: (user: User["id"]) => void;
};

const Table = ({ users, onSaveUser, onDeleteUser }: TableProps) => {
  const [userToEdit, setUserToEdit] = useState<User | null>();

  const onClickConfirm = (user: User) => {
    setUserToEdit(null); // Close the <EditableRow />
    onSaveUser(user);
  };
  const onClickEdit = (user: User) => {
    setUserToEdit(cloneDeep(user));
  };

  const onClickDelete = (userId: User["id"]) => {
    setUserToEdit(null);
    onDeleteUser(userId);
  };

  return (
    <table id="users-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th></th>
          {Boolean(userToEdit) ? (
            <>
              <th></th>
              <th></th>
            </>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          if (userToEdit?.id === user.id) {
            return (
              <Fragment key={user.id}>
                <EditableRow
                  user={userToEdit}
                  onCancel={() => setUserToEdit(null)}
                  onConfirm={(user) => onClickConfirm(user)}
                  onDelete={onClickDelete}
                />
              </Fragment>
            );
          }
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td
                className="action-icon"
                data-testid="edit-action"
                onClick={() => onClickEdit(user)}
              >
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
