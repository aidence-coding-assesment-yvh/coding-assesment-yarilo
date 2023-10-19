import User from "../types/User";
import "./Table.css";

type TableProps = {
  users: User[];
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
            <tr>
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
