import "./EditableRow.css";
import { cloneDeep } from "lodash";
import { Check, X, Trash } from "lucide-react";
import User from "../types/User";
import { useState } from "react";

type EditableRowProps = {
  user: User;
  onConfirm: (user: User) => void;
  onCancel: () => void;
  onDelete: (userId: User["id"]) => void;
};

const EditableRow = ({
  user,
  onConfirm,
  onCancel,
  onDelete,
}: EditableRowProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const onClickConfirm = () => {
    const newUser = cloneDeep(user);
    newUser.name = name;
    newUser.email = email;
    onConfirm(newUser);
  };
  return (
    <tr>
      <td>
        <input
          type={"text"}
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </td>
      <td>
        <input
          type={"text"}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </td>
      <td className="action-icon confirm-edit-icon" onClick={onClickConfirm}>
        <Check />
      </td>
      <td className="action-icon cancel-edit-icon" onClick={onCancel}>
        <X />
      </td>
      <td
        className="action-icon delete-edit-icon"
        onClick={() => onDelete(user.id)}
      >
        <Trash />
      </td>
    </tr>
  );
};

export default EditableRow;
