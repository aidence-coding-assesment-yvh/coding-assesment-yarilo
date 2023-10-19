import "./EditableRow.css";
import { cloneDeep } from "lodash";
import { Check, X } from "lucide-react";
import User from "../types/User";
import { useState } from "react";

type EditableRowProps = {
  user: User;
  onConfirm: (user: User) => void;
  onCancel: () => void;
};

const EditableRow = ({ user, onConfirm, onCancel }: EditableRowProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const onClickConfirm = () => {
    const newUser = cloneDeep(user);
    newUser.name = name;
    newUser.email = email;
    onConfirm(newUser);
  };
  return (
    <tr key={user.id}>
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
      <td className="confirm-edit-icon" onClick={onClickConfirm}>
        <Check />
      </td>
      <td className="cancel-edit-icon" onClick={onCancel}>
        <X />
      </td>
    </tr>
  );
};

export default EditableRow;
